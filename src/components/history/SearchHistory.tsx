// src/components/history/SearchHistory.tsx
import { useState } from 'react';

import { HistoryItem } from './HistoryItem';
import { SearchHistoryItem } from '@app/components/chatForm/types/SearchHistoryItem';
import TypographyText from '@app/components/common/base/TypographyText';
import MovieThumbnail from '@app/components/common/MovieThumbnail';
import { StyledBoxContainer, StyledTitle, StyledDescription, StyledHistoryItem, StyledButton } from './styles/searchHistoryStyles';
import { Box } from '@mui/system';

export function SearchHistory({ history }: { history: SearchHistoryItem[] }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SearchHistoryItem | null>(null);

  const handleClickOpen = (item: SearchHistoryItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const getMovieName = (suggestion: string) => {
    const suggestionNamePattern = /'([^']+)'/;
    const match = suggestion.match(suggestionNamePattern);
    return match ? match[1] : suggestion.split(' ').slice(0, 3).join(' ');
  };

  return (
    <StyledBoxContainer>
      <StyledTitle variant="h5">Last Recommendations</StyledTitle>
      <StyledDescription variant="body2">We use the data from your previous searches to provide better recommendations for your new searches.</StyledDescription>
      {Array.isArray(history) &&
        history.slice(0, 10).map((item, index) => {
          const movieName = getMovieName(item.suggestion);

          return (
            <StyledHistoryItem key={index}>
              <Box display="flex" alignItems="center">
                <MovieThumbnail movieName={movieName} />
                <TypographyText variant="body1">{movieName}</TypographyText>
              </Box>
              <StyledButton id={`history-${index}`} onClick={() => handleClickOpen(item)}>
                View Description
              </StyledButton>
            </StyledHistoryItem>
          );
        })}

      <HistoryItem open={open} handleClose={handleClose} selectedItem={selectedItem} />
    </StyledBoxContainer>
  );
}
