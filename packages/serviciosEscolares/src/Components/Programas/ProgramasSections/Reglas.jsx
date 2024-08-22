import React, { useState, useContext } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { Context, getToken } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

const apikey = process.env.NEXT_PUBLIC_API_KEY;
const url = process.env.NEXT_PUBLIC_URL;

export default function Reglas() {
  const { setNoti, setLoading } = useContext(Context);
  const router = useRouter();
  const { query } = router;

  const [form, setForm] = useState({
    id: query.id,
    calificacionMinima: '',
    calificacionMaxima: '',
    calificacionAprobatoria: '',
    calificacionDecimal: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const formatToDecimal = (value) => parseFloat(value).toFixed(1);

  const handleSubmit = async () => {
    setLoading(true);
    const token = getToken();
    const dataBody = {
      programa: {
        calificacionMinima: form.calificacionDecimal === '1' ? formatToDecimal(form.calificacionMinima) : form.calificacionMinima,
        calificacionMaxima: form.calificacionDecimal === '1' ? formatToDecimal(form.calificacionMaxima) : form.calificacionMaxima,
        calificacionAprobatoria: form.calificacionDecimal === '1' ? formatToDecimal(form.calificacionAprobatoria) : form.calificacionAprobatoria,
        calificacionDecimal: form.calificacionDecimal === '1',
      },
    };

    try {
      const response = await fetch(
        `${url}/api/v1/solicitudes/${query.id}`,
        {
          method: 'PATCH',
          headers: {
            api_key: apikey,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataBody),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setLoading(false);
      setNoti({
        open: true,
        message: '¡Reglas actualizadas con éxito!',
        type: 'success',
      });
      router.back();
      return result;
    } catch (error) {
      setLoading(false);
      setNoti({
        open: true,
        message: `¡Error al actualizar las reglas!: ${error.message}`,
        type: 'error',
      });
      return null;
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Reglas</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="ID"
            name="id"
            value={form.id}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Calificación Mínima"
            name="calificacionMinima"
            type="number"
            value={form.calificacionMinima}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Calificación Máxima"
            name="calificacionMaxima"
            type="number"
            value={form.calificacionMaxima}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Calificación Aprobatoria"
            name="calificacionAprobatoria"
            type="number"
            value={form.calificacionAprobatoria}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Calificaciones Decimales"
            name="calificacionDecimal"
            value={form.calificacionDecimal}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="1">Si</MenuItem>
            <MenuItem value="2">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
