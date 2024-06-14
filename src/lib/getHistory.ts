import axios from 'axios';

import { RecommendationsHistoryItem } from '@app/components/types/RecommendationsHistoryItem';

export async function getHistory() {
  const res: { data: { history: RecommendationsHistoryItem[] } } | undefined = await axios.get<{ history: RecommendationsHistoryItem[] }>('/api/history');
  return res;
}
