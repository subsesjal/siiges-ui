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

  const totalCreditosPrograma = Number(alumno?.programa?.creditos ?? alumno?.creditos ?? 0);

  const asignaturasMap = new Map();
  (historial ?? [])
    .filter((r) => r && r.asignatura)
    .forEach((record) => {
      const prev = asignaturasMap.get(record.asignaturaId);
      if (prev) {
        if (prev.tipo === 1 && record.tipo === 2) asignaturasMap.set(record.asignaturaId, record);
      } else {
        asignaturasMap.set(record.asignaturaId, record);
      }
    });

  const creditosObtenidos = [...asignaturasMap.values()]
    .reduce((sum, r) => sum + Number(r?.asignatura?.creditos ?? 0), 0);

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
        <LabelData
          title="Créditos Obtenidos"
          subtitle={`${creditosObtenidos} de ${totalCreditosPrograma}`}
        />
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
    situacionId: PropTypes.number.isRequired,
    matricula: PropTypes.string.isRequired,
    creditos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    programa: PropTypes.shape({
      creditos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  historial: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      alumnoId: PropTypes.number.isRequired,
      grupoId: PropTypes.number.isRequired,
      asignaturaId: PropTypes.number.isRequired,
      calificacion: PropTypes.string.isRequired,
      tipo: PropTypes.number.isRequired,
      fechaExamen: PropTypes.string.isRequired,
      asignatura: PropTypes.shape({
        id: PropTypes.number,
        clave: PropTypes.string,
        nombre: PropTypes.string,
        creditos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      grupo: PropTypes.shape({
        cicloEscolar: PropTypes.shape({
          nombre: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};
