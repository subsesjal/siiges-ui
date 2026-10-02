import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider } from '@mui/material';
import { ListTitle, ListSubtitle, useUI } from '@siiges-ui/shared';
import { HistorialTable } from '@siiges-ui/serviciosescolares';

export default function HistorialAcademico({ alumno, historial, simple }) {
  const { setLoading } = useUI();

  useEffect(() => {
    setLoading(!alumno);
  }, [alumno, setLoading]);

  if (!alumno) return null;

  const totalCreditosPrograma = Number(
    alumno?.programa?.creditos ?? alumno?.creditos ?? 0,
  );

  const notaAprobatoria = parseFloat(alumno?.calificacionAprobatoria);
  const tieneCalificacionAprobatoria = !Number.isNaN(notaAprobatoria);

  const aprobadasPorAsignatura = new Map();
  (historial ?? []).forEach((record) => {
    if (!record?.asignatura) return;

    const nota = parseFloat(record.calificacion);
    if (Number.isNaN(nota)) return;
    if (tieneCalificacionAprobatoria && nota < notaAprobatoria) return;

    const previa = aprobadasPorAsignatura.get(record.asignaturaId);
    if (!previa || nota > previa.nota) {
      aprobadasPorAsignatura.set(record.asignaturaId, {
        nota,
        asignatura: record.asignatura,
      });
    }
  });

  const creditosObtenidos = Math.round(
    [...aprobadasPorAsignatura.values()].reduce(
      (sum, { asignatura }) => sum + (Number(asignatura?.creditos) || 0),
      0,
    ) * 100,
  ) / 100;

  return (
    <Grid container spacing={2}>
      {!simple && (
        <>
          <Grid item xs={6}>
            <Typography variant="h6">Calificaciones</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Grid container alignItems="center" sx={{ width: 'auto' }}>
              <Grid item>
                <ListTitle text="Créditos Obtenidos" />
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Grid item>
                <ListSubtitle
                  text={`${creditosObtenidos} de ${totalCreditosPrograma}`}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <HistorialTable alumno={historial} simple={simple} />
      </Grid>
    </Grid>
  );
}

HistorialAcademico.defaultProps = {
  simple: false,
};

HistorialAcademico.propTypes = {
  simple: PropTypes.bool,
  alumno: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    apellidoPaterno: PropTypes.string.isRequired,
    apellidoMaterno: PropTypes.string,
    situacionId: PropTypes.number.isRequired,
    matricula: PropTypes.string.isRequired,
    creditos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    calificacionAprobatoria: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
