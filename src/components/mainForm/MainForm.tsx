import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useState } from 'react';

import ImdbLinkList from './ImdbLinkList';
import MovieRecommendation from './MovieRecommendation';
import { appColor, gridContainerStyles, StyledBox } from './styles/movieSuggestionFormStyles';
import WelcomeMessage from './WelcomeMessage';
import FormContainer from '@app/components/base/FormContainer';
import InputField from '@app/components/base/InputField';
import SubmitButton from '@app/components/base/SubmitButton';
import TypographyText from '@app/components/base/TypographyText';
import { RecommendationHistory } from '@app/components/history/RecommendationHistory';
import { useMovieForm } from '@app/hooks/useMovieForm';
import { getHistory } from '@app/lib/getHistory';
import { handleSuggestion } from '@app/lib/handleSuggestion';

const MovieSuggestionForm: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { history, extractedImdbUrls, setHistory } = useMovieForm(userInput, response);

  const handleSuggestClick = async () => {
    setLoading(true);
    const suggestion = await handleSuggestion(userInput, extractedImdbUrls);
    setResponse(suggestion);
    const historyResponse = await getHistory();
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
      <Grid container sx={gridContainerStyles}>
        <Grid item xs={12} md={12}>
          <WelcomeMessage />
          <Box mb={2}>
            <InputField label="Describe your preferences" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          </Box>
          <Box mb={2} display="flex" justifyContent="center">
            <SubmitButton onClick={handleSuggestClick}></SubmitButton>
          </Box>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : (
            response && <MovieRecommendation suggestion={response} />
          )}
          <RecommendationHistory history={history} />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default MovieSuggestionForm;
