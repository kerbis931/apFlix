import { Document } from '@langchain/core/documents';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function scrapeMovieName(html: string) {
  const $ = cheerio.load(html);
  const movieName = $('[data-testid="hero__primary-text"]').text().trim();
  return movieName || 'No title found';
}

async function scrapeMovieDescription(html: string) {
  const $ = cheerio.load(html);
  const movieDescription = $('[data-testid="plot"]').text().trim();
  return movieDescription || 'No description found';
}

export async function splitHtmlDocuments(urls: string[]): Promise<Document[]> {
  const documents: Document[] = [];
  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await getHtml(url);
        const movieName = await scrapeMovieName(res);
        const movieDescription = await scrapeMovieDescription(res);
        const stringOfInterest = `${movieName} - the description: ${movieDescription} @@@`;
        const doc = new Document({
          pageContent: stringOfInterest,
          metadata: { name: movieName, url: url }
        });
        // Split the document into smaller documents
        const docSplit = new RecursiveCharacterTextSplitter({
          chunkSize: 400,
          chunkOverlap: 20,
          separators: ['@@@']
        });
        const splitDocs = await docSplit.splitDocuments([doc]);
        documents.push(...splitDocs);
      } catch (error) {
        console.error(`Error fetching content from ${url}:`, error);
      }
    })
  );
  return documents;
}

async function getHtml(url: string) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  };
  const res = await axios.get(url, { headers });
  return res.data;
}

// Test function
async function testScraping() {
  const testUrls = ['https://www.imdb.com/title/tt12747748/'];
  const result = await splitHtmlDocuments(testUrls);
  console.log(result);
}

testScraping();
