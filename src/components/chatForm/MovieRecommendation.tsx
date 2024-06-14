// src/components/chatForm/MovieRecommendation.tsx
import MovieThumbnail from '@app/components/common/MovieThumbnail';
import TypographyText from '@app/components/common/base/TypographyText';
import React from 'react';
import { StyledMovieDetails, StyledResponseBox } from './styles/movieRecommendationStyles';

const getMovieName = (suggestion: string) => {
  const match = suggestion.match(/'([^']+)'/);

  return match ? match[1] : 'No Recommendation';
};

interface MovieRecommendationProps {
  suggestion: string;
}

const MovieRecommendation: React.FC<MovieRecommendationProps> = ({ suggestion }) => {
  const movieName = getMovieName(suggestion);

  return (
    <StyledResponseBox>
      <MovieThumbnail movieName={movieName} width={100} height={140} />
      <StyledMovieDetails>
        <TypographyText variant="h6">Recommendation:</TypographyText>
        <TypographyText variant="body1">{suggestion}</TypographyText>
      </StyledMovieDetails>
    </StyledResponseBox>
  );
};

export default MovieRecommendation;
