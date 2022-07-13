import Image from 'next/image';
import {
  SignIn, Logo, Header, Navbar,
} from '@siiges-ui/authentication';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

function LogInPage() {
  return (
    <ThemeProvider theme={theme}>
      <Image
        alt="travel"
        src="/Fondo.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{ zIndex: -1 }}
      />
      <Grid
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', backgroundImage: `url(${Image})` }}
      >
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
