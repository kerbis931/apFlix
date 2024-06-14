// src/components/chatForm/ImdbLinkList.tsx
import { Divider } from '@mui/material';

import { StyledDivider, StyledLink, StyledLinkContainer, StyledPaper, StyledTypography } from './styles/imdbLinkListStyles';

type ImdbLinkListProps = {
  extractedImdbUrls: string[];
};

export default function ImdbLinkList({ extractedImdbUrls }: ImdbLinkListProps) {
  return (
    extractedImdbUrls.length > 0 && (
      <StyledPaper elevation={8}>
        <StyledTypography variant="h6" gutterBottom>
          {`Extracted IMDB URLs (${extractedImdbUrls.length})`}
        </StyledTypography>
        <StyledDivider>
          <Divider />
        </StyledDivider>
        <StyledLinkContainer>{renderImdbLinks(extractedImdbUrls)}</StyledLinkContainer>
      </StyledPaper>
    )
  );
}

function renderImdbLinks(extractedImdbUrls: string[]) {
  return extractedImdbUrls.map((url, index) => (
    <StyledLink key={index} href={url} target="_blank" rel="noreferrer">
      {url}
    </StyledLink>
  ));
}
