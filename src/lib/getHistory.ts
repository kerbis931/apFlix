import axios from 'axios';

import { SearchHistoryItem } from '@app/components/chatForm/types/SearchHistoryItem';

export async function getHistory() {
  const res: { data: { history: SearchHistoryItem[] } } | undefined = await axios.get<{ history: SearchHistoryItem[] }>('/api/history');
  return res;
}
