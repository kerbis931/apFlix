import axios from 'axios';

import { RecommendationsHistoryItem } from '@app/components/types/RecommendationsHistoryItem';

export async function fetchHistory() {
  try {
    const res: { data: { history: RecommendationsHistoryItem[] } } | undefined = await axios.get<{ history: RecommendationsHistoryItem[] }>('/api/history');
    return res;
  } catch (err) {
    console.error('Error fetching recommendations history:', err);
    return undefined;
  }
}
