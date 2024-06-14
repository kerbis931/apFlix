import { Container, Paper } from '@mui/material';

type FormContainerProps = {
  children: React.ReactNode;
};
const formContainerBackground = '#003366';
const boxShadowStyle = '0 8px 16px rgba(0,0,0,0.3)';
const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: '2rem',
          background: formContainerBackground,
          boxShadow: boxShadowStyle,
          color: 'white',
          borderRadius: '10px'
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default FormContainer;
