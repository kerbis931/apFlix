import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

import TypographyText from '@app/components/common/base/TypographyText';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '10px'
}));

export const StyledTitle = styled(TypographyText)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

export const StyledHistoryItem = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

export const StyledButton = styled(Button)(() => ({
  variant: 'outlined',
  size: 'small'
}));
