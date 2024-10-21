import { Grid, Typography } from '@mui/material';
import { Context, LabelData } from '@siiges-ui/shared';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function HistorialAcademico({ alumno }) {
  const { setLoading } = useContext(Context);
  useEffect(() => {
    setLoading(!alumno);
  }, [alumno, setLoading]);

  if (!alumno) {
    return null;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del Alumno</Typography>
      </Grid>
      <Grid item xs={5}>
        <LabelData title="Matrícula" subtitle={alumno.matricula} />
      </Grid>
      <Grid item xs={5}>
        <LabelData title="Situación" subtitle={alumno.situacionId} />
      </Grid>
      <Grid item xs={5}>
        <LabelData title="Créditos Obtenidos" subtitle={alumno.programa.creditos} />
      </Grid>
      <Grid item xs={5}>
        <LabelData title="Apellido Paterno" subtitle={alumno.apellidoPaterno} />
      </Grid>
      <Grid item xs={5}>
        <LabelData title="Apellido Materno" subtitle={alumno.apellidoMaterno} />
      </Grid>
      <Grid item xs={5}>
        <LabelData title="Nombre" subtitle={alumno.nombre} />
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
    programa: PropTypes.string.isRequired,
    situacionId: PropTypes.number.isRequired,
    matricula: PropTypes.string.isRequired,
  }).isRequired,
};
