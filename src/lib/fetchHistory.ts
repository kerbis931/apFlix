import axios from 'axios';

import { RecommendationsHistoryItem } from '@app/components/types/RecommendationsHistoryItem';

export async function fetchHistory() {
  const res: { data: { history: RecommendationsHistoryItem[] } } | undefined = await axios.get<{ history: RecommendationsHistoryItem[] }>('/api/history');
  return res;
}
