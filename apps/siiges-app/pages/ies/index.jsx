import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Background, Logo } from '@siiges-ui/shared';

export default function IESLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    NIP: '',
    center: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.NIP || !form.center) {
      setError('Todos los campos son requeridos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = process.env.NEXT_PUBLIC_URL_TITULOS;
      const response = await fetch(`${url}/sec/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.toUpperCase(),
          NIP: form.NIP,
          center: form.center,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el token en sessionStorage
        sessionStorage.setItem('iesToken', data.token || data.data?.token);
        sessionStorage.setItem('iesCenter', form.center);
        router.push('/ies/dashboard');
      } else if (response.status === 401) {
        setError('Credenciales incorrectas');
      } else if (response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error al iniciar sesión. Intente nuevamente.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Logo />
        </Box>

        <Paper
          elevation={5}
          sx={{
            p: 4,
            width: '400px',
            maxWidth: '90%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}
          >
            Acceso IES - Títulos Electrónicos
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleOnChange}
                  disabled={loading}
                  required
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="NIP"
                  name="NIP"
                  type="password"
                  value={form.NIP}
                  onChange={handleOnChange}
                  disabled={loading}
                  required
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Centro (Institución)"
                  name="center"
                  value={form.center}
                  onChange={handleOnChange}
                  disabled={loading}
                  required
                  placeholder="Ej: 140394"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgb(206, 209, 212)',
            py: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#3b4245' }}>
            &copy; 2026 Secretaría General de Gobierno - Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ color: '#3b4245' }}>
            DOC01 - 2.0.0
          </Typography>
        </Box>
      </Box>
    </>
  );
}
