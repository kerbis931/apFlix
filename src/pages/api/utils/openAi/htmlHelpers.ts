import { Document } from '@langchain/core/documents';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function extractMovieName(html: string) {
  const $ = cheerio.load(html);
  const movieName = $('[data-testid="hero__primary-text"]').text().trim();
  return movieName || 'No title found';
}

async function extractMovieDescription(html: string) {
  const $ = cheerio.load(html);
  const movieDescription = $('[data-testid="plot"]').text().trim();
  const movieDescriptionLimitedTo1000Chars = movieDescription.slice(0, 1000);
  return movieDescriptionLimitedTo1000Chars || 'No description found';
}

export async function splitHtmlDocuments(urls: string[]): Promise<Document[]> {
  const documents: Document[] = [];
  await Promise.all(
    urls.map(async (url) => {
      try {
        const html = await getHtml(url);
        const movieName = await extractMovieName(html);
        const movieDescription = await extractMovieDescription(html);
        const stringOfInterest = `movie name: '${movieName}', movie description: ${movieDescription} @@@`;
        const doc = new Document({
          pageContent: stringOfInterest,
          metadata: { name: movieName, url: url }
        });
        // Split the document into smaller documents
        const docSplit = new RecursiveCharacterTextSplitter({
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
