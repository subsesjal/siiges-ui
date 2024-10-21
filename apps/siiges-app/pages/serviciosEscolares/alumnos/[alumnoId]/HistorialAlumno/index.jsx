import { Layout } from '@siiges-ui/shared';
// import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import alumnosService from '@siiges-ui/serviciosescolares/src/Components/utils/alumnosService';
import HistorialAcademico
  from '@siiges-ui/serviciosescolares/src/Components/Alumnos/AlumnosHistorial';

export default function HistorialAlumno() {
  const router = useRouter();
  const { query } = router;
  const [alumno, setAlumno] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    async function fetchAlumno() {
      const { dataForm } = await alumnosService({ id: query.alumnoId, method: 'GET' });
      setAlumno(dataForm);
    }

    if (query.alumnoId) {
      fetchAlumno();
    }
  }, [query.alumnoId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Historial Académico del Alumno">
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Información Personal" />
            <Tab label="Kardex" />
          </Tabs>
        </Grid>
        {value === 0 && <HistorialAcademico alumno={alumno} />}
        {/* {value === 1 && <DocumentosAlumno id={alumno.id} type="edit" />} */}
      </Grid>
    </Layout>
  );
}
