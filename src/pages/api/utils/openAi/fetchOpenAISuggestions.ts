import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { ChatCompletionMessageParam } from 'openai/resources';

import { getMainMovieRecommendationPrompt } from './getPromptsWrappers';
import { splitHtmlDocuments } from './htmlHelpers';
import { moviesList } from '@app/pages/api/data/moviesList';

export const model = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0.0
});

export const fetchOpenAISuggestionsUsingEmbedding = async (messages: ChatCompletionMessageParam[], extractedImdbUrls: string[]): Promise<string> => {
  const documents = await splitHtmlDocuments(extractedImdbUrls);
  const prompt = ChatPromptTemplate.fromTemplate(getMainMovieRecommendationPrompt(moviesList));
  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt: prompt
  });

  const vectorStore = await createEmbeddings(documents);
  const retriever = vectorStore.asRetriever({
    k: 1
  });
  const retrieverChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever: retriever
  });

  const response = await retrieverChain.invoke({
    input: messages.map((msg) => msg.content).join('\n')
  });

  return response?.answer || 'No recommendation found';
};

const createEmbeddings = async (documents: Document[]): Promise<MemoryVectorStore> => {
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
  return vectorStore;
};
