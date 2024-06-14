import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionMessageParam } from 'openai/resources';

import { moviesList } from './data/moviesList';
import { saveLastSuggestionToDb } from './utils/db/saveLastSuggestionToDb';
import { fetchOpenAISuggestions } from './utils/openAi/fetchOpenAISuggestions';
import { getMainMovieRecommendationPrompt } from './utils/openAi/getMainMovieRecommendationPrompt';

export const generatePromptedMessages = (description: string, movies: string[]): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: getMainMovieRecommendationPrompt(movies)
    },
    {
      role: 'user',
      content: `User Description: ${description}`
    }
  ];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userDescription, extractedImdbUrls } = req.body;

  if (!userDescription) {
    return res.status(400).json({ error: 'User description is required' });
  }
  let suggestion;

  try {
    const messagesWithPrompt = generatePromptedMessages(userDescription, moviesList);
    suggestion = await fetchOpenAISuggestions(messagesWithPrompt, extractedImdbUrls);
    res.status(200).json({ suggestion: suggestion });
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({ error: 'An error occurred while fetching the recommendation' });
  } finally {
    await saveLastSuggestionToDb(suggestion, userDescription);
  }
}
