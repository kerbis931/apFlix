import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

type SubmitButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};
const chatSubmitButtonColor = '#003366';
const submitButtonColor = '#FFCC00';
const SubmitButton = ({ onClick, children }: SubmitButtonProps) => {
  return (
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
      {children}
    </Button>
  );
};

export default SubmitButton;
