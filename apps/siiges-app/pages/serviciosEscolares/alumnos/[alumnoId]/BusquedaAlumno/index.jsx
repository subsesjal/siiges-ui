import { ButtonSimple, getData, Layout } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import { Grid, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import alumnosService from '@siiges-ui/serviciosescolares/src/Components/utils/alumnosService';
import AlumnoData from '@siiges-ui/serviciosescolares/src/Components/Alumnos/AlumnosData';
import { HistorialAcademico } from '@siiges-ui/serviciosescolares';

export default function BusquedaAlumno() {
  const router = useRouter();
  const { query } = router;
  const [alumno, setAlumno] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    async function fetchAlumno() {
      const { dataForm } = await alumnosService({
        id: query.alumnoId,
        method: 'GET',
      });
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
    <Layout title="Consultar Alumno">
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <AlumnoData alumno={alumno} />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <HistorialAcademico alumno={alumno} historial={historial} simple />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <ButtonSimple
            onClick={() => {
              router.back();
            }}
            text="Regresar"
            align="right"
            design="enviar"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
