import React from 'react';
import { ButtonLogin, Input, LinkButton } from '@siiges-ui/shared';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function RecoverPass() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mt: 3,
          py: 3,
          px: 3,
          height: '260px',
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
        }}
      >
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>Recuperar contraseña</Typography>
        <Input label="Usuario" id="user" name="user" auto="user" size="small" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ zIndex: 1, position: 'relative', mt: 2 }}
        >
          <Link href="/Login" passHref>
            <LinkButton text="¿Tienes cuenta? Inicia sesión" />
          </Link>
        </Box>
        <ButtonLogin color="secondary" type="submit" text="Enviar correo" href="./Home" />
      </Paper>
    </Box>
  );
}
