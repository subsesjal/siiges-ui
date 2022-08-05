import React from 'react';
import { Container } from '@mui/material';
import { PaperHome, Overlay, HomeHeader } from '@siiges-ui/shared';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import theme from '../theme';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            <HomeHeader title="Bienvenido" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            <hr style={{ marginTop: 50 }} />
            <Box
              sx={{
                display: 'flex',
                '& > :not(style)': {
                  mt: 5,
                  mx: 1,
                  width: 350,
                  height: 250,
                },
              }}
            >
              <PaperHome
                title="Noticia 1"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua."
              />
              <PaperHome
                title="Noticia 2"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua."
              />
              <PaperHome
                title="Noticia 3"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua."
              />
              <PaperHome
                title="Noticia 4"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua."
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
