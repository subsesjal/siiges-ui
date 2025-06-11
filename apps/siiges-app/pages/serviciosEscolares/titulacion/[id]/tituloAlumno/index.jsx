import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Grid, Tab, Tabs } from '@mui/material';
import {
  DocumentosAlumnoTitulacion,
  FormAlumnoTitulacion,
  HistorialTable,
  Titulacion,
  alumnosService,
} from '@siiges-ui/serviciosescolares';
import { ButtonSimple, getData, Layout } from '@siiges-ui/shared';

export default function TituloAlumno() {
  const router = useRouter();
  const { query } = router;
  const [alumno, setAlumno] = useState(null);
  const [value, setValue] = useState(0);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    async function fetchAlumno() {
      const { dataForm } = await alumnosService({ id: query.id, method: 'GET' });
      setAlumno(dataForm);
    }

    async function fetchHistorial() {
      const result = await getData({ endpoint: `/calificaciones/alumnos/${query.id}` });
      if (result.statusCode === 200) {
        setHistorial(result.data);
      }
    }

    if (query.id) {
      fetchAlumno();
      fetchHistorial();
    }
  }, [query.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Titulación de alumno">
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
            <Tab label="Historial Academico" />
            <Tab label="Titulación" />
          </Tabs>
        </Grid>
        {value === 0 && <FormAlumnoTitulacion alumno={alumno} />}
        {value === 1 && <DocumentosAlumnoTitulacion type="edit" id={alumno.id} />}
        {value === 2 && <HistorialTable alumno={historial} />}
        {value === 3 && <Titulacion programaId={alumno.programaId} />}
        <Grid item xs={12}>
          <ButtonSimple text="Regresar" design="enviar" align="right" onClick={() => { router.back(); }} />
        </Grid>
      </Grid>
    </Layout>
  );
}
