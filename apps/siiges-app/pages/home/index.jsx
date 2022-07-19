import React from 'react';
import Image from 'next/image';
import { Container, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MainNavbar } from '@siiges-ui/shared';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import theme from '../theme';

export default function SignIn() {
  return (
    <ThemeProvider theme={theme}>
      <Image
        alt="travel"
        src="/Fondo.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{
          zIndex: -1,
          overflow: 'hidden',
        }}
      />
      <MainNavbar />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom component="div">
              Bienvenido
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
              <br />
              <br />
              Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </Typography>
            <hr style={{ marginTop: 50 }} />
            <Box
              sx={{
                display: 'flex',
                '& > :not(style)': {
                  mt: 5,
                  mx: 1,
                  width: 350,
                  height: 200,
                },
              }}
            >
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                  Noticia 1
                </Typography>
                <hr />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                  Noticia 2
                </Typography>
                <hr />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                  Noticia 3
                </Typography>
                <hr />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                  Noticia 4
                </Typography>
                <hr />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </Typography>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
