import { useEffect, useState } from 'react';

import { RecommendationsHistoryItem } from '@app/components/types/RecommendationsHistoryItem';
import { fetchHistory } from '@app/lib/fetchHistory';

export const useFetchHistory = (response: string) => {
  const [history, setHistory] = useState<RecommendationsHistoryItem[]>([]);

  useEffect(() => {
    const historyFetcher = async () => {
      const res = await fetchHistory();
      setHistory((res && res.data.history) || []);
    };
    historyFetcher();
  }, [response]);

  return { history, setHistory };
};
