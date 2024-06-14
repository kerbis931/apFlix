import axios from 'axios';
import { useEffect, useState } from 'react';

const defaultThumbnail = 'https://via.placeholder.com/50x75';
const thumbnailProviderKey = process.env.OMDB_API_KEY || 'YOUR_API_KEY';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useMovieThumbnail = (movieName: string) => {
  const [thumbnail, setThumbnail] = useState<string>(defaultThumbnail);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchThumbnail = async () => {
      let attempts = 0;
      let success = false;

      while (attempts < MAX_RETRIES && !success) {
        try {
          const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${thumbnailProviderKey}`);
          if (response.data.Poster) {
            setThumbnail(response.data.Poster);
            success = true;
          } else {
            attempts++;
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          }
        } catch (err) {
          console.error('Error fetching movie thumbnail:', err);
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }

      if (!success) {
        setError(true);
      }

      setLoading(false);
    };

    fetchThumbnail();
  }, [movieName]);

  return { thumbnail, loading, error };
};
