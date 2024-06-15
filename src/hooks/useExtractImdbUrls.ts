import { useEffect, useState } from 'react';

export const useExtractImdbUrls = (userInput: string) => {
  const [extractedImdbUrls, setExtractedImdbUrls] = useState<string[]>([]);
  // TODO: How to verify the url is from imdb before excuting it.

  useEffect(() => {
    const imdbUrlPattern = /(https?:\/\/(?:www\.)?imdb\.com\/title\/tt[0-9]+)/g;
    const urls = userInput.match(imdbUrlPattern) || [];
    setExtractedImdbUrls(urls);
  }, [userInput]);

  return { extractedImdbUrls };
};
