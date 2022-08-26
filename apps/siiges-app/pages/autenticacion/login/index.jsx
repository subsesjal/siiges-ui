import { React } from 'react';
import { SignIn } from '@siiges-ui/authentication';
import {
  Logo,
  Header,
  Navbar,
  Background,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

function LogInPage() {
  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Grid alignItems="center" justifyContent="center">
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Navbar />
          <Logo />
          <Header />
          <SignIn />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LogInPage;
