import { Box, CircularProgress } from '@mui/material';
import React from 'react';

import MovieRecommendation from './MovieRecommendation';

interface RenderMovieRecommendationProps {
  loading: boolean;
  response: string;
}

const RenderMovieRecommendation: React.FC<RenderMovieRecommendationProps> = ({ loading, response }) =>
  loading ? (
    <Box display="flex" justifyContent="center" mt={2}>
      <CircularProgress />
    </Box>
  ) : (
    response && <MovieRecommendation suggestion={response} />
  );

export default RenderMovieRecommendation;
