// src/hooks/useMovieThumbnail.ts
import axios from 'axios';
import { useEffect, useState } from 'react';

const defaultThumbnail = 'https://via.placeholder.com/50x75';
const thumbnailProviderKey = process.env.OMDB_API_KEY || 'YOUR_API_KEY';

export const useMovieThumbnail = (movieName: string) => {
  const [thumbnail, setThumbnail] = useState<string>(defaultThumbnail);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${thumbnailProviderKey}`);
        if (response.data.Poster) {
          setThumbnail(response.data.Poster);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching movie thumbnail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnail();
  }, [movieName]);

  return { thumbnail, loading, error };
};
