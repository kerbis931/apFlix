import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledResponseBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0,0,0,0.7)',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center'
}));

export const StyledMovieDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2)
}));
