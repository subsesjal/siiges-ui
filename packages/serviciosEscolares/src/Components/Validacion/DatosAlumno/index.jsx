import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@mui/material';
import { Context, LabelData } from '@siiges-ui/shared';

export default function DatosAlumno({ alumno }) {
  const { setLoading } = useContext(Context);
  useEffect(() => {
    setLoading(!alumno);
  }, [alumno, setLoading]);

  if (!alumno) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} />
      <Grid item xs={12}>
        <Typography variant="h6">Datos del Alumno</Typography>
      </Grid>
      <Grid item xs={4}>
        <LabelData title="ID" subtitle={alumno.id} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Persona ID" subtitle={alumno.personaId} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Programa ID" subtitle={alumno.programaId} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Nombre" subtitle={alumno.nombre} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Primer Apellido" subtitle={alumno.apellidoPaterno} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Segundo Apellido" subtitle={alumno.apellidoMaterno} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="CURP" subtitle={alumno.curp} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Programa" subtitle={alumno.programa} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Modificado Por" subtitle={alumno.modificado} />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de Institución de origen</Typography>
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Institución" subtitle={alumno.institucion} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Plantel" subtitle={alumno.plantel} />
      </Grid>
      <Grid item xs={4}>
        <LabelData
          title="Clave de Centro de Trabajo"
          subtitle={alumno.claveCentroTrabajo}
        />
      </Grid>
    </Grid>
  );
}

DatosAlumno.propTypes = {
  alumno: PropTypes.shape({
    id: PropTypes.number.isRequired,
    personaId: PropTypes.number.isRequired,
    programaId: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    apellidoPaterno: PropTypes.string.isRequired,
    apellidoMaterno: PropTypes.string,
    curp: PropTypes.string.isRequired,
    programa: PropTypes.string.isRequired,
    modificado: PropTypes.string,
    institucion: PropTypes.string.isRequired,
    plantel: PropTypes.string,
    claveCentroTrabajo: PropTypes.string,
  }).isRequired,
};
