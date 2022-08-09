import React from 'react';
import { RecoverPass } from '@siiges-ui/authentication';
import {
  Logo,
  Header,
  Navbar,
  Background,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

function Password() {
  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Grid
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Navbar />
          <Logo />
          <Header />
          <RecoverPass />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Password;
