// src/components/MovieThumbnail.tsx
import { Box, CircularProgress } from '@mui/material';
import Image from 'next/image';

import { useMovieThumbnail } from '@app/hooks/useMovieThumbnail';

const imgStyle = { borderRadius: '5px' };

interface MovieThumbnailProps {
  movieName: string;
  width?: number;
  height?: number;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = ({ movieName, width = 50, height = 75 }) => {
  const { thumbnail, loading, error } = useMovieThumbnail(movieName);

  return (
    <Box display="flex" alignItems="center">
      {loading ? (
        <CircularProgress size={24} />
      ) : error ? (
        <Box width={width} height={height} style={{ ...imgStyle, background: '#ccc' }}>
          No Image
        </Box>
      ) : (
        <Image src={thumbnail} alt={movieName} width={width} height={height} style={imgStyle} />
      )}
    </Box>
  );
};

export default MovieThumbnail;
