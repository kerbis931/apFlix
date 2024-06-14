import { AdbOutlined } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';

import { example } from '@app/pages/api/data/inputExample';

const highlightColor = '#FFCC00';
const responseBoxBackgroundColor = 'rgba(0,0,0,0.7)';
const WelcomeMessage = () => {
  return (
    <Box mt={2} p={2} style={{ backgroundColor: responseBoxBackgroundColor, borderRadius: '5px', display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <Typography variant="body1">
        Welcome to APFlix! Describe your movie preferences in the box below. For example, you can mention your age, where you are from, and what kind of movie you are in the mood for.
        <br />
        Add links to movies from IMDb to enrich the LLM search results.
      </Typography>
      <Tooltip title={example}>
        <AdbOutlined style={{ color: highlightColor }} />
      </Tooltip>
    </Box>
  );
};

export default WelcomeMessage;
