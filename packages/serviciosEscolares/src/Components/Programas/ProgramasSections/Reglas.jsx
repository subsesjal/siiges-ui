import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { Context, getData, updateRecord } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

export default function Reglas() {
  const { setNoti, setLoading } = useContext(Context);
  const router = useRouter();
  const { query } = router;

  const [form, setForm] = useState({
    id: query.id || '',
    calificacionMinima: '',
    calificacionMaxima: '',
    calificacionAprobatoria: '',
    calificacionDecimal: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getData({ endpoint: `/programas/${query.id}` });

      if (response.statusCode === 200) {
        const data = response.data || {};
        setForm({
          id: query.id || '',
          calificacionMinima: data.calificacionMinima || '',
          calificacionMaxima: data.calificacionMaxima || '',
          calificacionAprobatoria: data.calificacionAprobatoria || '',
          calificacionDecimal: data.calificacionDecimal ? '1' : '2',
        });
      } else {
        setNoti({
          open: true,
          message: response.errorMessage,
          type: 'error',
        });
      }
      setLoading(false);
    };

    if (query.id) {
      fetchData();
    }
  }, [query.id, setLoading, setNoti]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const formatToDecimal = (value) => parseFloat(value).toFixed(1);

  const handleSubmit = async () => {
    setLoading(true);
    const dataBody = {
      programa: {
        calificacionMinima: form.calificacionDecimal === '1' ? formatToDecimal(form.calificacionMinima) : form.calificacionMinima,
        calificacionMaxima: form.calificacionDecimal === '1' ? formatToDecimal(form.calificacionMaxima) : form.calificacionMaxima,
        calificacionAprobatoria: form.calificacionDecimal === '1' ? formatToDecimal(form.calificacionAprobatoria) : form.calificacionAprobatoria,
        calificacionDecimal: form.calificacionDecimal === '1',
      },
    };

    try {
      const response = await updateRecord({
        data: dataBody,
        endpoint: `/solicitudes/${query.id}`,
      });

      if (response.statusCode !== 200) {
        throw new Error(response.errorMessage || 'Error al actualizar las reglas');
      }

      setLoading(false);
      setNoti({
        open: true,
        message: '¡Reglas actualizadas con éxito!',
        type: 'success',
      });
      router.back();
      return response;
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
