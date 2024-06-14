import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center'
}));

export const gridContainerStyles = {
  spacing: 2
};

export const appColor = '#FFCC00';
