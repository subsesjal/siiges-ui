import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Typography, Grid, Tab, Tabs, Box } from '@mui/material';
import { LabelData, Layout, Loading } from '@siiges-ui/shared';
import getAsignaturaById from '../../utils/getAsignaturaById';
import CalOrdinarias from '../CalOrdinarias';
import CalExtraordinarias from '../CalExtraordinarias';

export default function DetallesAsignatura({ type }) {
  const disabled = type !== 'editar';
  const router = useRouter();
  const { asignaturaId, grupoId } = router.query;
  const [asignatura, setAsignatura] = useState(null);
  const [labelPrograma, setLabelPrograma] = useState();
  const [labelGrado, setLabelGrado] = useState();
  const [labelGrupo, setLabelGrupo] = useState();
  const [labelTurno, setLabelTurno] = useState();
  const [labelCiclo, setLabelCiclo] = useState();
  const [labelAsignatura, setLabelAsignatura] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (asignaturaId && grupoId) {
      getAsignaturaById(asignaturaId)
        .then((data) => {
          setAsignatura(data);
          setLabelAsignatura(data.nombre);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch asignatura', error);
        });
    }
  }, [router.query]);

  return (
    <Layout title="Acreditación">
      {!asignatura ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">{labelPrograma}</Typography>
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Ciclo" subtitle={labelCiclo} />
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Grado" subtitle={labelGrado} />
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Grupo" subtitle={labelGrupo} />
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Turno" subtitle={labelTurno} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Asignatura details tabs"
                >
                  <Tab label="Calificaciones Ordinarias" />
                  <Tab label="Calificaciones Extraordinarios" />
                </Tabs>
              </Box>
            </Grid>
          </Grid>
          {value === 0 && (
            <CalOrdinarias
              disabled={disabled}
              labelAsignatura={labelAsignatura}
            />
          )}
          {value === 1 && (
            <CalExtraordinarias
              disabled={disabled}
              labelAsignatura={labelAsignatura}
            />
          )}
        </>
      )}
    </Layout>
  );
}

DetallesAsignatura.propTypes = {
  type: PropTypes.string.isRequired,
};
