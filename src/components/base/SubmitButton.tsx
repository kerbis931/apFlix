import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
type SubmitButtonProps = {
  onClick: () => void;
};
const chatSubmitButtonColor = '#003366';
const submitButtonColor = '#FFCC00';
import Box from '@mui/material/Box';

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        id="submit-button"
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={onClick}
        style={{
          backgroundColor: submitButtonColor,
          color: chatSubmitButtonColor,
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        Suggest a movie
      </Button>
    </Box>
  );
};
export default SubmitButton;
