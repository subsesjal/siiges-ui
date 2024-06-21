import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Grid, Tab, Tabs } from '@mui/material';
import { DocumentosAlumno, FormAlumno } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import alumnosService from '@siiges-ui/serviciosescolares/src/Components/utils/alumnosService';

export default function EditarAlumno() {
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
    <Layout title="Editar Alumno">
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
            <Tab label="Documentos" />
          </Tabs>
        </Grid>
        {value === 0 && <FormAlumno type="edit" alumno={alumno} />}
        {value === 1 && <DocumentosAlumno id={alumno.id} type="edit" />}
      </Grid>
    </Layout>
  );
}
