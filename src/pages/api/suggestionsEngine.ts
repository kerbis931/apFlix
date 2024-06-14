import type { NextApiRequest, NextApiResponse } from 'next';

import { saveLastSuggestionToDb } from './utils/db/saveLastSuggestionToDb';
import { fetchOpenAISuggestionsUsingEmbedding } from './utils/openAi/fetchOpenAISuggestions';
import { isSuggestionValid, isUserDescriptionValid } from './utils/openAi/prePostValidations';

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
    suggestion = await fetchOpenAISuggestionsUsingEmbedding(userDescriptionLimitedTo1000Chars, extractedImdbUrls);
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
