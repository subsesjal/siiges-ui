import React from 'react';
import { Container, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MainNavbar, Input, ButtonStyled } from '@siiges-ui/shared';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import theme from '../theme';

export default function UserProfile() {
  return (
    <ThemeProvider theme={theme}>
      <MainNavbar />
      <Image
        alt="background"
        src="/Fondo.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{
          zIndex: -1,
          overflow: 'hidden',
        }}
      />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5, minHeight: 500 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ marginTop: 7 }}>
                <Image
                  alt="avatar"
                  src="/avatar.png"
                  quality={100}
                  width="300px"
                  height="300px"
                  style={{
                    zIndex: 1,
                    overflow: 'hidden',
                  }}
                />
                <Paper
                  sx={{
                    padding: 2,
                    marginTop: 3,
                    width: 300,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="p">
                    Luis Manuel de Alba Villaseñor
                  </Typography>
                  <br />
                  <Divider sx={{ marginY: 1 }} />
                  <Typography variant="p">
                    El jefe de jefes
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5" gutterBottom component="div">
                  Información Personal
                </Typography>
                <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <Input label="Nombre(s)" id="name" name="name" auto="name" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Primer Apellido" id="lastname1" name="lastname1" auto="lastname1" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Segundo Apellido" id="lastname2" name="lastname2" auto="lastname2" size="small" />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={8}>
                    <Input label="Cargo" id="cargo" name="cargo" auto="cargo" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Rol" id="rol" name="rol" auto="rol" size="small" />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <Input label="Correo Electronico" id="email" name="email" auto="email" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Nacionalidad" id="nationality" name="nationality" auto="nationality" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Sexo" id="gender" name="gender" auto="gender" size="small" />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <Input label="INE" id="ine" name="ine" auto="ine" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Curp" id="curp" name="curp" auto="curp" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="RFC" id="rfc" name="rfc" auto="rfc" size="small" />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <Input label="Telefono" id="phone" name="phone" auto="phone" size="small" />
                  </Grid>
                  <Grid item xs={4}>
                    <Input label="Celular" id="cellphone" name="cellphone" auto="cellphone" size="small" />
                  </Grid>
                </Grid>
                <Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ marginTop: 0, marginLeft: -30 }}>
                  <Grid item xs={2} sx={{ marginX: 1 }}>
                    <ButtonStyled text="Cancelar" alt="Cancelar" type="error" />
                  </Grid>
                  <Grid item xs={2} sx={{ marginX: 1 }}>
                    <ButtonStyled text="Guardar" alt="Guardar" type="success" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
