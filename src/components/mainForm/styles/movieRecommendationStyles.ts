import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledResponseBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0,0,0,0.7)',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

export const StyledMovieDetails = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginTop: 0,
    marginLeft: theme.spacing(2)
  },
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left'
  }
}));
