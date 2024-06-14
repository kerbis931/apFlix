import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

import { splitHtmlDocuments } from './htmlHelpers';
import { getMainMovieRecommendationPrompt } from './systemPromptsWrappers';
import { moviesList } from '@app/pages/api/data/moviesList';

export const model = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0.0
});

export const fetchOpenAISuggestionsUsingEmbedding = async (userDescription: string, extractedImdbUrls: string[]): Promise<string> => {
  const documents = await splitHtmlDocuments(extractedImdbUrls);
  const generateMovieRecommendationPrompt = getMainMovieRecommendationPrompt(moviesList);
  const finalPrompt = ChatPromptTemplate.fromTemplate(generateMovieRecommendationPrompt);
  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: finalPrompt
  });

  const vectors = await createEmbeddings(documents);
  const retriever = vectors.asRetriever({
    k: 1
  });

  const retrieverChain = await createRetrievalChain({
    combineDocsChain: combineDocsChain,
    retriever: retriever
  });

  const response = await retrieverChain.invoke({
    input: userDescription
  });

  return response?.answer || 'No recommendation found';
};

const createEmbeddings = async (documents: Document[]): Promise<MemoryVectorStore> => {
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
  return vectorStore;
};
