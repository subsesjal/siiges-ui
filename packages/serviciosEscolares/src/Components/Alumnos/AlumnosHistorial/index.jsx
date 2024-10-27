import { Grid, Typography } from '@mui/material';
import { Context, LabelData } from '@siiges-ui/shared';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HistorialTable } from '@siiges-ui/serviciosescolares';

export default function HistorialAcademico({ alumno, historial }) {
  const { setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(!alumno);
  }, [alumno, setLoading]);

  if (!alumno) {
    return null;
  }

  return (
    <Grid container spacing={1} sx={{ paddingTop: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del Alumno</Typography>
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Matrícula" subtitle={alumno.matricula} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Situación" subtitle={alumno.situacionId} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Créditos Obtenidos" subtitle={alumno.programa.creditos} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Apellido Paterno" subtitle={alumno.apellidoPaterno} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Apellido Materno" subtitle={alumno.apellidoMaterno} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Nombre" subtitle={alumno.nombre} />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Typography variant="h6">Calificaciones</Typography>
      </Grid>
      <Grid item xs={12}>
        <HistorialTable alumno={historial} />
      </Grid>
    </Grid>
  );
}

HistorialAcademico.propTypes = {
  alumno: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    apellidoPaterno: PropTypes.string.isRequired,
    apellidoMaterno: PropTypes.string,
    programa: PropTypes.shape({
      creditos: PropTypes.number.isRequired,
    }).isRequired,
    situacionId: PropTypes.number.isRequired,
    matricula: PropTypes.string.isRequired,
  }).isRequired,
  historial: PropTypes.arrayOf(PropTypes.object).isRequired,
};
