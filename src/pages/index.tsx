import { Box, Container, CssBaseline } from '@mui/material';
import Head from 'next/head';

import MovieSuggestionForm from '@app/components/chatForm/MovieSuggestionForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>APFlix</title>
        <meta name="description" content="APFlix Movie Recommendation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
          <MovieSuggestionForm />
        </Box>
      </Container>
    </>
  );
}
