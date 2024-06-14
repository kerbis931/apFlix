// src/pages/api/history.ts
import type { NextApiRequest, NextApiResponse } from 'next';

import SearchHistory from './models/SearchHistory';
import dbConnect from './utils/db/dbConnect';
import { SearchHistoryItem } from '@app/components/chatForm/types/SearchHistoryItem';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const searchHistory = await getHistory();
      res.status(200).json({ history: searchHistory });
    } catch (error) {
      console.error('Error fetching search history:', error);
      res.status(500).json({ error: 'An error occurred while fetching the search history' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getHistory(): Promise<SearchHistoryItem[]> {
  const searchHistory = await SearchHistory.find().sort({ createdAt: -1 }).limit(4);
  if (!searchHistory) {
    console.error('Search history not found');
    return [];
  }
  return searchHistory;
}
