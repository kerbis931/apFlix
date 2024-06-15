import { TextField } from '@mui/material';

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const fieldBackgroundColor = '#FFFFFFCC';
const inputLabelColor = '#798d8f';
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
          marginTop: '0.5rem',
          marginBottom: '1rem'
        },
        inputProps: {
          maxLength: 1000
        }
      }}
      InputLabelProps={{
        style: { color: inputLabelColor }
      }}
    />
  );
};

export default InputField;
