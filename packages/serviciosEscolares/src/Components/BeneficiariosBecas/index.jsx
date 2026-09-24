import React, { useState } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Input, ButtonSimple, useUI } from '@siiges-ui/shared';
import BeneficiariosBecasTable from './BeneficiariosBecasTable';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function ConsultBeneficiariosBecas() {
  const [correo, setCorreo] = useState('');
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNoti } = useUI();

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
    setBeneficiarios([]);
  };

  const handleDesbloquear = async () => {
    if (!correo) {
      setNoti({
        open: true,
        type: 'error',
        message: 'Ingresa un correo para continuar.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${domain}/api/v1/public/beneficiariosBecas?correo=${encodeURIComponent(correo.trim())}`,
        {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`¡HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBeneficiarios(data.data || []);
      setHeaders(data.headers || []);

      if (data.data.length === 0) {
        setNoti({
          open: true,
          type: 'error',
          message: 'No se encontraron registros de beneficiarios.',
        });
      }
    } catch (error) {
      console.error('¡Error al buscar beneficiarios!:', error);
      setBeneficiarios([]);
      setHeaders([]);
      setNoti({
        open: true,
        type: 'error',
        message: 'El correo ingresado no está autorizado para consultar los beneficiarios.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6">Consulta de beneficiarios de becas</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Input
          id="correo-beneficiarios"
          label="Correo"
          name="correo"
          type="email"
          value={correo}
          onChange={handleCorreoChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ButtonSimple
          text="DESBLOQUEAR"
          design="guardar"
          align="center"
          onClick={handleDesbloquear}
        />
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <BeneficiariosBecasTable rows={beneficiarios} headers={headers} />
        )}
      </Grid>
    </Grid>
  );
}
