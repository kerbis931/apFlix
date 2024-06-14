import { Box, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPaper = styled(Paper)(({}) => ({
  position: 'fixed',
  top: '1rem',
  left: '1rem',
  padding: '1.5rem',
  backgroundColor: '#f5f5f5',
  width: '400px',
  zIndex: 1000,
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 2rem)',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}));

export const StyledTypography = styled(Typography)(({}) => ({
  fontWeight: 'bold',
  color: '#333',
  fontSize: '1rem'
}));

export const StyledDivider = styled(Box)(({}) => ({
  marginBottom: '1rem'
}));

export const StyledLinkContainer = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}));

export const StyledLink = styled(Link)(({}) => ({
  marginBottom: '0.5rem',
  color: '#007BFF',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#0056b3',
    textDecoration: 'underline'
  },
  fontSize: '0.7rem'
}));
