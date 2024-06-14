import React from 'react';

import { StyledMovieDetails, StyledResponseBox } from './styles/movieRecommendationStyles';
import TypographyText from '@app/components/base/TypographyText';
import MovieThumbnail from '@app/components/MovieThumbnail';

const getMovieName = (suggestion: string) => {
  const suggestedMovieRegex = /'([^']+)'/;
  const match = suggestion.match(suggestedMovieRegex);
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
