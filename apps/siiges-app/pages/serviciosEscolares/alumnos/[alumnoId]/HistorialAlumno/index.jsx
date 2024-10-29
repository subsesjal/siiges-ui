import { Layout, getData } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import alumnosService from '@siiges-ui/serviciosescolares/src/Components/utils/alumnosService';
import HistorialAcademico from '@siiges-ui/serviciosescolares/src/Components/Alumnos/AlumnosHistorial';

export default function HistorialAlumno() {
  const router = useRouter();
  const { query } = router;
  const [alumno, setAlumno] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    async function fetchAlumno() {
      const { dataForm } = await alumnosService({ id: query.alumnoId, method: 'GET' });
      setAlumno(dataForm);
    }

    async function fetchHistorial() {
      const result = await getData({ endpoint: `/calificaciones/alumnos/${query.alumnoId}` });
      if (result.statusCode === 200) {
        setHistorial(result.data);
      }
    }

    if (query.alumnoId) {
      fetchAlumno();
      fetchHistorial();
    }
  }, [query.alumnoId]);

  return (
    <Layout title="Historial Académico del Alumno">
      <Grid container>
        <HistorialAcademico alumno={alumno} historial={historial} />
      </Grid>
    </Layout>
  );
}
