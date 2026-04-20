import { Layout, getData, Context } from '@siiges-ui/shared';
import {
  BusquedaAlumnosForm,
  BusquedaAlumnosTable,
} from '@siiges-ui/serviciosescolares';
import { Divider, Grid } from '@mui/material';
import React, { useState, useContext } from 'react';

const FIELDS_MAP = {
  apellidoPaterno: 'apellidoPaterno',
  apellidoMaterno: 'apellidoMaterno',
  nombre: 'nombre',
  curp: 'curp',
  claveCentroTrabajo: 'cct',
  matricula: 'matricula',
};

export default function BusquedaAlumnos() {
  const { setNoti } = useContext(Context);
  const [formData, setFormData] = useState({});
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildQuery = () => {
    const params = new URLSearchParams();
    Object.entries(FIELDS_MAP).forEach(([formKey, apiKey]) => {
      const value = formData[formKey];
      if (value && value.trim() !== '') {
        params.append(apiKey, value.trim());
      }
    });
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getData({
        endpoint: '/alumnos/persona',
        query: buildQuery(),
      });
      if (response.statusCode === 200) {
        const rows = (response.data || []).map((alumno) => ({
          id: alumno.id,
          nombreCompleto: [
            alumno.persona?.nombre,
            alumno.persona?.apellidoPaterno,
            alumno.persona?.apellidoMaterno,
          ]
            .filter(Boolean)
            .map((s) => s.trim())
            .join(' '),
          curp: alumno.persona?.curp || '',
          claveTrabajo: alumno.programa?.plantel?.claveCentroTrabajo || '',
          programa: alumno.programa?.nombre || '',
          matricula: alumno.matricula || '',
        }));

        if (rows.length === 0) {
          setNoti({
            open: true,
            type: 'info',
            message: 'No se encontraron alumnos con los datos proporcionados.',
          });
        }

        setAlumnos(rows);
      } else {
        setAlumnos([]);
        setNoti({
          open: true,
          type: 'error',
          message: response.errorMessage || '¡Error al realizar la búsqueda!',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Busqueda de Alumnos">
      <Grid container>
        <Grid item xs={12}>
          <BusquedaAlumnosForm
            formData={formData}
            onChange={handleChange}
            onSearch={handleSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <BusquedaAlumnosTable alumnos={loading ? [] : alumnos} />
        </Grid>
      </Grid>
    </Layout>
  );
}
