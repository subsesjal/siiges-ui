import React, { useState } from 'react';
import {
  ButtonLogin, Input, InputPassword, LinkButton, useAuth, useUI,
  ButtonsForm, DefaultModal, updateRecord,
} from '@siiges-ui/shared';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import submitNewLogin from '../../utils/submitNewLogin';

export default function SignIn() {
  const { activateAuth, removeAuth, session } = useAuth();
  const { setLoading } = useUI();
  const [errorMessages, setErrorMessages] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
  const router = useRouter();

  const errors = {
    usuario: '¡Usuario equivocado!',
    contrasena: '¡Contraseña equivocada!',
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    submitNewLogin(
      form,
      errors,
      setErrorMessages,
      (authData) => {
        if (authData?.data?.avisoPrivacidad === false) {
          activateAuth(authData, true);
          setOpen(true);
        } else {
          activateAuth(authData);
        }
      },
      setLoading,
    );
  };

  const handleAccept = async () => {
    const result = await updateRecord({
      endpoint: `/usuarios/${session.id}`,
      data: { avisoPrivacidad: true },
    });

    if (result.statusCode === 200) {
      setOpen(false);
      router.push('../home');
    }
  };

  const handleReject = () => {
    removeAuth();
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '75.3vh',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            mt: 3,
            py: 3,
            px: 3,
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
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'black' }}>
            Iniciar Sesión
          </Typography>
          <Input
            label="Usuario"
            id="usuario"
            name="usuario"
            auto="usuario"
            size="normal"
            onChange={handleOnChange}
            errorMessage={errorMessages.usuario}
          />
          <InputPassword
            label="Contraseña"
            id="contrasena"
            name="contrasena"
            auto="contrasena"
            type="contrasena"
            size="normal"
            onChange={handleOnChange}
            errorMessage={errorMessages.contrasena}
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
          <ButtonLogin click={handleSubmit} color="secondary" type="submit" text="Entrar" />
        </Paper>
      </Box>

      <Box
        sx={{
          width: '100%',
          backgroundColor: 'rgb(206, 209, 212)',
          py: 2,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="body2" style={{ color: '#3b4245' }}>
          &copy; 2025 Secretaría General de Gobierno - Todos los derechos reservados.
        </Typography>
        <Typography variant="body2" style={{ color: '#3b4245' }}>
          Edificio MIND Av. Faro #2350 , Colonia: Verde Valle , CP: 44540, Guadalajara, Jalisco
          Lunes a Viernes de 09:00:00 a 17:00:00 horas
        </Typography>
        <Typography variant="body2" style={{ color: '#3b4245' }}>
          <Link
            href="https://transparenciasitgej.jalisco.gob.mx/api/api/archivos/1908/download?inline=true"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            Avisos de privacidad
          </Link>
        </Typography>
      </Box>

      <DefaultModal open={open} setOpen={setOpen}>
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        }}
        >
          <img src="/LogoJalisco.png" alt="Logo Jalisco" style={{ width: '250px' }} />
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Consulta nuestro Aviso de Privacidad Integral
          </Typography>
          <a
            href="https://transparenciasitgej.jalisco.gob.mx/api/api/archivos/1908/download?inline=true"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Ver Aviso de Privacidad
          </a>
          <Divider sx={{ width: '100%' }} />
          <ButtonsForm
            confirm={handleAccept}
            cancel={handleReject}
            confirmText="Acepto"
            cancelText="No Acepto"
          />
        </Box>
      </DefaultModal>
    </Box>
  );
}
