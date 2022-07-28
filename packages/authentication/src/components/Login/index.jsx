import React from 'react';
import {
  ButtonLogin,
  Input,
  InputPassword,
  LinkButton,
} from '@siiges-ui/shared';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function SignIn() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mt: 3,
          py: 3,
          px: 3,
          height: '330px',
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
          backgroundColor: 'rgb(255, 255, 255, 0.75)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'black' }}>Iniciar Sesión</Typography>
        <Input label="Usuario" id="user" name="user" auto="user" size="small" />
        <InputPassword label="Contraseña" id="password" name="password" auto="current-password" type="password" size="small" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ zIndex: 1, position: 'relative', mt: 2 }}
        >
          <Link href="/password" passHref>
            <LinkButton text="¿Has olvidado tu contraseña?" />
          </Link>
        </Box>
        <ButtonLogin color="secondary" type="submit" text="Entrar" href="./home" />
      </Paper>
    </Box>
  );
}
