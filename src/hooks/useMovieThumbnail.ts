import axios from 'axios';
import { useEffect, useState } from 'react';

const defaultThumbnail = 'https://via.placeholder.com/50x75';

export const useMovieThumbnail = (movieName: string) => {
  const [thumbnail, setThumbnail] = useState<string>(defaultThumbnail);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchThumbnail = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`/api/fetchThumbnail`, { params: { movieName } });
        setThumbnail(response.data.thumbnail);
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
