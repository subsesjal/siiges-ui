import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Tab, Tabs } from '@mui/material';
import { DatosAlumno, DatosInstitucion } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import alumnosService from '@siiges-ui/serviciosescolares/src/Components/utils/alumnosService';

export default function ValidarAlumno() {
  const router = useRouter();
  const { query } = router;
  const [alumno, setAlumno] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    async function fetchAlumno() {
      const { dataForm } = await alumnosService({ id: query.validacionId, method: 'GET' });
      setAlumno(dataForm);
    }

    if (query.validacionId) {
      fetchAlumno();
    }
  }, [query.validacionId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Validar Alumno">
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
            <Tab label="Datos del Alumno" />
            <Tab label="Datos de Institucuión de Procedencia" />
          </Tabs>
        </Grid>
        {value === 0 && <DatosAlumno alumno={alumno} />}
        {value === 1 && <DatosInstitucion alumno={alumno} />}
      </Grid>
    </Layout>
  );
}
