import React, { useState } from 'react';
import {
  ButtonLogin, Input, LinkButton, useUI,
} from '@siiges-ui/shared';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function RecoverPass({ setPassword }) {
  const [user, setUser] = useState('');
  const { setNoti, setLoading, loading } = useUI();

  const handleInputChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      setNoti({
        open: true,
        message: '¡Por favor ingresa tu usuario!',
        type: 'warning',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${domain}/api/v1/public/auth/tokenRecoveryPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: apiKey,
        },
        body: JSON.stringify({ usuario: user }),
      });

      const data = await response.json();

      if (response.ok) {
        setNoti({
          open: true,
          message: 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message: data.message || '¡Error al solicitar recuperación de contraseña!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error de conexión!. Por favor intenta nuevamente.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
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
            height: 'auto',
            minHeight: '260px',
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
          <Input
            label="Usuario"
            id="user"
            name="user"
            auto="user"
            size="normal"
            onChange={handleInputChange}
            value={user}
          />

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              zIndex: 1, position: 'relative', mt: 2, cursor: 'pointer',
            }}
          >
            <LinkButton style={{ cursor: 'pointer' }} text="¿Tienes cuenta? Inicia sesión" onClick={() => setPassword(false)} />
          </Box>
          <ButtonLogin
            color="secondary"
            type="submit"
            text="Enviar correo"
            click={handleSubmit}
            disabled={loading}
          />
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
    </Box>
  );
}

RecoverPass.propTypes = {
  setPassword: PropTypes.func.isRequired,
};
