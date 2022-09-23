import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
import users from '../../users.json';

export default function SignIn() {
  const [errorMessages, setErrorMessages] = useState({});
  const router = useRouter();

  const errors = {
    uname: 'Usuario equivocado',
    pass: 'Contraseña equivocada',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = document.forms[0];
    const userData = users.find((user) => user.usuario === uname.value);

    if (userData) {
      if (userData.contrasena !== pass.value) {
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        router.push('../home');
      }
    } else {
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };

  const errorMessage = (name) => name === errorMessages.name && errorMessages.message;

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
        <form onSubmit={handleSubmit}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: 'center', color: 'black' }}
          >
            Iniciar Sesión
          </Typography>
          <Input
            label="Usuario"
            id="user"
            name="uname"
            auto="user"
            size="normal"
            errorMessage={errorMessage('uname')}
          />
          <InputPassword
            label="Contraseña"
            id="password"
            name="pass"
            auto="current-password"
            type="password"
            errorMessage={errorMessage('pass')}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ zIndex: 1, position: 'relative', mt: 2 }}
          >
            <Link href="/autenticacion/contrasena" passHref>
              <LinkButton text="¿Has olvidado tu contraseña?" />
            </Link>
          </Box>
          <ButtonLogin color="secondary" type="submit" text="Entrar" />
        </form>
      </Paper>
    </Box>
  );
}
