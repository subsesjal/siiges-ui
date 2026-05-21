import React, { useState } from 'react';
import { Layout, useUI } from '@siiges-ui/shared';
import { Divider, Grid } from '@mui/material';
import {
  MatriculaActivaForm,
  MatriculaActivaTable,
} from '@siiges-ui/serviciosescolares';

export default function MatriculaActiva() {
  const { setNoti, setLoading, loading } = useUI();
  const [formData, setFormData] = useState({});
  const [busquedaGeneral, setBusquedaGeneral] = useState(true);
  const [matriculasActivas, setMatriculasActivas] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      setMatriculasActivas([
        {
          id: 1,
          nombreCompleto: 'Juan Pérez',
          curp: 'PEJU800101HDFLNR08',
          claveTrabajo: '12345',
          programa: 'Ingeniería en Computación',
          plantel: 'Plantel Central',
          matricula: '12345',
          institucion: 'Institución de Prueba',
          totalAlumnos: 150,
        },
        {
          id: 2,
          nombreCompleto: 'María López',
          curp: 'LOLM800101HDFLNR09',
          claveTrabajo: '67890',
          programa: 'Licenciatura en Administración',
          plantel: 'Plantel Norte',
          matricula: '67890',
          institucion: 'Institución de Prueba',
          totalAlumnos: 200,
        },
      ]);
      setLoading(false);
      setNoti({ message: 'Búsqueda completada', severity: 'success' });
    }, 2000);
  };

  return (
    <Layout title="Busqueda de Matrícula Activa">
      <Grid container>
        <Grid item xs={12}>
          <MatriculaActivaForm
            formData={formData}
            onChange={handleChange}
            onSearch={handleSearch}
            setBusquedaGeneral={setBusquedaGeneral}
            busquedaGeneral={busquedaGeneral}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <MatriculaActivaTable
            matriculasActivas={loading ? [] : matriculasActivas}
            busquedaGeneral={busquedaGeneral}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
