import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import {
  Grid, Tabs, Tab, Box,
} from '@mui/material';
import {
  DocumentosAlumno,
  FormAlumno,
  ExpedienteAlumno,
} from '@siiges-ui/serviciosescolares';
import { Layout, getData } from '@siiges-ui/shared';
import HistorialAcademico from '@siiges-ui/serviciosescolares/src/Components/Alumnos/AlumnosHistorial';
import alumnosService from '@siiges-ui/serviciosescolares/src/Components/utils/alumnosService';

export default function EditarAlumno() {
  const router = useRouter();
  const { query } = router;
  const [alumno, setAlumno] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [value, setValue] = useState(0);

  const fetchAlumno = useCallback(async () => {
    if (query.alumnoId) {
      const { dataForm } = await alumnosService({
        id: query.alumnoId,
        method: 'GET',
      });
      setAlumno(dataForm);
    }
  }, [query.alumnoId]);

  useEffect(() => {
    fetchAlumno();

    async function fetchHistorial() {
      const result = await getData({ endpoint: `/calificaciones/alumnos/${query.alumnoId}` });
      if (result.statusCode === 200) {
        setHistorial(result.data);
      }
    }

    if (query.alumnoId) {
      fetchHistorial();
    }
  }, [query.alumnoId, fetchAlumno]);

  const mostrarExpediente = alumno?.tipoTramiteId !== 7;

  const tabsConfig = [
    {
      label: 'Alumno',
      component: <FormAlumno type="edit" alumno={alumno} onAlumnoUpdated={fetchAlumno} />,
    },
    { label: 'Documentos', component: <DocumentosAlumno id={alumno?.id} type="edit" /> },
    { label: 'Historial', component: <HistorialAcademico alumno={alumno} historial={historial} /> },
    ...(mostrarExpediente
      ? [{
        label: 'Expediente',
        component: <ExpedienteAlumno alumno={alumno} setAlumno={setAlumno} type="edit" />,
      }]
      : []),
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Modificar Alumno">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Tabs value={value} onChange={handleChange}>
            {tabsConfig.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            {tabsConfig[value].component}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
