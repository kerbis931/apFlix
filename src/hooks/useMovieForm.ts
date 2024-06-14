import { useEffect, useState } from 'react';

import { RecommendationsHistoryItem } from '@app/components/types/RecommendationsHistoryItem';
import { getHistory } from '@app/lib/getHistory';

export const useMovieForm = (userInput: string, response: string) => {
  const [history, setHistory] = useState<RecommendationsHistoryItem[]>([]);
  const [extractedImdbUrls, setExtractedImdbUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory();
      setHistory((res && res.data.history) || []);
    };
    fetchHistory();
  }, [response]);

  useEffect(() => {
    const imdbUrlPattern = /(https?:\/\/(?:www\.)?imdb\.com\/title\/tt[0-9]+)/g;
    const urls = userInput.match(imdbUrlPattern) || [];
    setExtractedImdbUrls(urls);
  }, [userInput]);

  return { history, extractedImdbUrls, setHistory };
};
