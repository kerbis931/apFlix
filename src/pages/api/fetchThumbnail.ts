import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const thumbnailProviderKey = process.env.OMDB_API_KEY || 'YOUR_API_KEY';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieName } = req.query;

  if (!movieName) {
    return res.status(400).json({ error: 'Movie name is required' });
  }

  let attempts = 0;
  let success = false;
  let thumbnail = '';

  while (attempts < MAX_RETRIES && !success) {
    try {
      const thumbnailApiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName as string)}&apikey=${thumbnailProviderKey}`;
      const response = await axios.get(thumbnailApiUrl);
      if (response.data.Poster) {
        thumbnail = response.data.Poster;
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
    return res.status(500).json({ error: 'Failed to fetch movie thumbnail' });
  }

  res.status(200).json({ thumbnail });
}
