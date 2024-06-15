import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Grid } from '@mui/material';
import React, { useState } from 'react';

import ImdbLinkList from './ImdbLinkList';
import RenderMovieRecommendation from './RenderMovieRecommendation';
import { appColor, gridContainerStyles, StyledBox } from './styles/movieSuggestionFormStyles';
import WelcomeMessage from './WelcomeMessage';
import FormContainer from '@app/components/base/FormContainer';
import InputField from '@app/components/base/InputField';
import SubmitButton from '@app/components/base/SubmitButton';
import TypographyText from '@app/components/base/TypographyText';
import { RecommendationHistory } from '@app/components/history/RecommendationHistory';
import { useMovieForm } from '@app/hooks/useMovieForm';
import { fetchHistory } from '@app/lib/fetchHistory';
import { fetchRecommendation } from '@app/lib/fetchRecommendation';

const MovieSuggestionForm: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { history, extractedImdbUrls, setHistory } = useMovieForm(userInput, response);

  const handleSuggestClick = async () => {
    setLoading(true);
    const suggestion = await fetchRecommendation(userInput, extractedImdbUrls);
    setResponse(suggestion);
    const historyResponse = await fetchHistory();
    setHistory((historyResponse && historyResponse.data.history) || []);
    setLoading(false);
  };

  return (
    <FormContainer>
      <StyledBox>
        <MovieFilterIcon fontSize="large" style={{ marginRight: '0.5rem', color: appColor }} />
        <TypographyText variant="h3">APFlix</TypographyText>
      </StyledBox>
      <ImdbLinkList extractedImdbUrls={extractedImdbUrls} />
      <Grid container sx={gridContainerStyles} direction="column" alignItems="center">
        <WelcomeMessage />
        <InputField label="Describe your preferences" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <SubmitButton onClick={handleSuggestClick}></SubmitButton>
        <RenderMovieRecommendation loading={loading} response={response} />
        <RecommendationHistory history={history} />
      </Grid>
    </FormContainer>
  );
};

export default MovieSuggestionForm;
