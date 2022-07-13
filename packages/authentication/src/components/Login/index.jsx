import { React } from 'react';
import { ButtonLogin, Input, LinkButton } from '@siiges-ui/shared';
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
          mt: 6,
          py: 3,
          px: 3,
          height: '330px',
          width: '350px',
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
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>Iniciar Sesión</Typography>
        <Input label="Usuario" id="user" name="user" auto="user" />
        <Input label="Contraseña" id="password" name="password" auto="current-password" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Link href="/recuperar-cotra" passHref>
            <LinkButton text="¿Olvidaste tu contraseña?" />
          </Link>
        </Box>
        <ButtonLogin color="secondary" type="submit" text="Entrar" />
      </Paper>
    </Box>
  );
}
