import React from 'react';
import { ButtonLogin, Input, LinkButton } from '@siiges-ui/shared';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function Register() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mt: 3,
          py: 3,
          px: 3,
          height: '490px',
          width: '320px',
        },
      }}
      justifyContent="center"
    >
      <Paper
        elevation={5}
        sx={{
          fontSize: 12,
          '&:hover': {
            boxShadow: '15',
          },
          maxHeight: '490px',
          backgroundColor: 'rgb(255, 255, 255, 0.75)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'black' }}>Pre-registro</Typography>
        <Input label="Usuario" id="user" name="user" auto="user" size="normal" />
        <Input label="Correo" id="email" name="email" auto="email" size="normal" />
        <Input label="Contraseña" id="password" name="password" auto="current-password" type="password" size="normal" />
        <Input label="Repetir contraseña" id="repassword" name="repassword" auto="repassword" type="password" size="normal" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ zIndex: 1, position: 'relative', mt: 2 }}
        >
          <Link href="/autenticacion/login">
            <LinkButton text="¿Tienes cuenta? Inicia sesión" />
          </Link>
        </Box>
        <ButtonLogin color="secondary" type="submit" text="Enviar" href="../home" />
      </Paper>
    </Box>
  );
}
