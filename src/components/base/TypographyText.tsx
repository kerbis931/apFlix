import { Typography } from '@mui/material';

type TypographyTextProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const defaultFontFamily = 'Roboto, sans-serif';
const TypographyText = ({ variant, children, style }: TypographyTextProps) => {
  return (
    <Typography variant={variant} style={{ fontFamily: defaultFontFamily, fontWeight: 'bold', ...style }}>
      {children}
    </Typography>
  );
};

export default TypographyText;
