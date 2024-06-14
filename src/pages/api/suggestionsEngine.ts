import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionMessageParam } from 'openai/resources';

import { moviesList } from './data/moviesList';
import { saveLastSuggestionToDb } from './utils/db/saveLastSuggestionToDb';
import { fetchOpenAISuggestionsUsingEmbedding } from './utils/openAi/fetchOpenAISuggestions';
import { getMainMovieRecommendationPrompt } from './utils/openAi/getPromptsWrappers';
import { isSuggestionValid, isUserDescriptionValid } from './utils/openAi/prePostValidations';

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
  const userDescriptionLimitedTo1000Chars = userDescription.slice(0, 1000);

  try {
    const isValidPrompt = await isUserDescriptionValid(userDescriptionLimitedTo1000Chars);
    if (!isValidPrompt) {
      return res.status(400).json({ error: 'Invalid user description' });
    }
    const messagesWithPrompt = generatePromptedMessages(userDescriptionLimitedTo1000Chars, moviesList);
    suggestion = await fetchOpenAISuggestionsUsingEmbedding(messagesWithPrompt, extractedImdbUrls);
    if (await isSuggestionValid(suggestion)) {
      await saveLastSuggestionToDb(suggestion, userDescriptionLimitedTo1000Chars);
      res.status(200).json({ suggestion: suggestion });
    } else {
      res.status(200).json({ suggestion: 'No valid recommendation found' });
    }
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({ error: 'An error occurred while fetching the recommendation' });
  }
}
