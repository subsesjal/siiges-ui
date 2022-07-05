import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import fondo from "../../public/Fondo.jpg";
import Image from 'next/image';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      user: data.get('user'),
      password: data.get('password'),
    });
  };

  return (

    <Grid container component={Paper} sx={{ backgroundImage: `url(${fondo.src})`, backgroundSize: 'cover', height: '100vh', opacity: '0.8' }}>
      <Grid item sx={{ width: '100%', textAlign: 'center', marginTop: 10 }}>
        <Image src="/logoJalisco.png" alt="logo" height="200" width="200" />
        <Typography component="h1" variant="h5" sx={{ marginTop: 5, color: 'gray' }}>
          Sistema integral de información para la gestión de Educación Superior
        </Typography>
      </Grid>
      <Container component='main' maxWidth="xs">
        <CssBaseline />
        <Card variant="outlined"
          sx={{
            marginTop: 5
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                <b>Iniciar Sesión</b>
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Usuario"
                  name="user"
                  autoComplete="user"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"¿No tienes cuenta? Registrate"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
}