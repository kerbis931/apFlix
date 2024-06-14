import { TextField } from '@mui/material';

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const fieldBackgroundColor = 'rgba(255,255,255,0.8)';
const inputLabelColor = '#A12568';
const InputField = ({ label, value, onChange }: InputFieldProps) => {
  return (
    <TextField
      id="user-preferences-input" // For E2E testing
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      multiline
      minRows={4}
      InputProps={{
        style: {
          backgroundColor: fieldBackgroundColor,
          borderRadius: '5px',
          marginTop: '1rem'
        }
      }}
      InputLabelProps={{
        style: { color: inputLabelColor }
      }}
    />
  );
};

export default InputField;
