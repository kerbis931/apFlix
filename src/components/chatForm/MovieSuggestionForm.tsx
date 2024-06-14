import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import ImdbLinkList from './ImdbLinkList';
import MovieRecommendation from './MovieRecommendation';
import { appColor, gridContainerStyles, StyledBox } from './styles/movieSuggestionFormStyles';
import SubmitButton from './SubmitButton';
import { SearchHistoryItem } from './types/SearchHistoryItem';
import WelcomeMessage from './WelcomeMessage';
import FormContainer from '@app/components/common/base/FormContainer';
import InputField from '@app/components/common/base/InputField';
import TypographyText from '@app/components/common/base/TypographyText';
import { SearchHistory } from '@app/components/history/SearchHistory';
import { getHistory } from '@app/lib/getHistory';
import { handleSuggestion } from '@app/lib/handleSuggestion';

const MovieSuggestionForm: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [extractedImdbUrls, setExtractedImdbUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory();
      setHistory((res && res.data.history) || []);
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const imdbUrlPattern = /(https?:\/\/(?:www\.)?imdb\.com\/title\/tt[0-9]+)/g;
    const urls = userInput.match(imdbUrlPattern) || [];
    setExtractedImdbUrls(urls);
  }, [userInput]);

  const handleSuggestClick = async () => {
    setLoading(true);
    await handleSuggestion(userInput, setResponse, extractedImdbUrls);
    const res = await getHistory();
    setHistory((res && res.data.history) || []);
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
            <SubmitButton onClick={handleSuggestClick}>Suggest a movie</SubmitButton>
          </Box>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : (
            response && <MovieRecommendation suggestion={response} />
          )}
          <SearchHistory history={history} />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default MovieSuggestionForm;
