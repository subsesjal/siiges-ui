import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { Button, Context, DataTable } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import columnsInscritosOrdinario from '../../../Tables/columnsInscritosOrdinario';
import columnsInscritosExtra from '../../../Tables/columnsInscritosExtra';
import submitCalificaciones from '../../utils/submitCalificaciones';

export default function Calificaciones({
  mode,
  disabled,
  labelAsignatura,
  alumnos,
  grupoId,
  asignaturaId,
}) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState();
  const { setNoti } = useContext(Context);
  const router = useRouter();

  const isExtraordinarioEnabled = (alumnoId) => {
    const alumno = alumnos.find((a) => a.id === alumnoId);
    return alumno && alumno.calificaciones.length === 2;
  };

  const updateCalificaciones = (alumnoId, newValue, fieldToUpdate) => {
    setCalificaciones((prevCalificaciones) => {
      const existingIndex = prevCalificaciones.findIndex(
        (c) => c.alumnoId === alumnoId,
      );

      if (existingIndex > -1) {
        return prevCalificaciones.map((item, index) => (index === existingIndex
          ? { ...item, [fieldToUpdate]: newValue }
          : item));
      }
      return [
        ...prevCalificaciones,
        {
          alumnoId,
          calificacion: fieldToUpdate === 'calificacion' ? newValue : '',
          fechaExamen: fieldToUpdate === 'fechaExamen' ? newValue : '',
        },
      ];
    });
  };

  const validateCalificaciones = () => {
    if (calificaciones.length === 0) {
      return false;
    }
    return calificaciones.every(
      (c) => c.alumnoId != null
        && c.calificacion != null
        && c.calificacion.trim() !== '',
    );
  };

  const handleSubmit = async () => {
    if (!validateCalificaciones()) {
      setNoti({
        open: true,
        message: 'Validación fallida: Verifique las calificaciones.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    await submitCalificaciones(
      calificaciones,
      setNoti,
      grupoId,
      asignaturaId,
      mode === 'Ordinarias' ? 1 : 2,
      setResponse,
    );
    setIsSubmitting(false);
    console.log(response);
  };

  const columns = mode === 'Ordinarias'
    ? columnsInscritosOrdinario(disabled, updateCalificaciones)
    : columnsInscritosExtra(disabled, updateCalificaciones, isExtraordinarioEnabled);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable title={labelAsignatura} rows={alumnos} columns={columns} />
      </Grid>
      <Grid item xs={3}>
        <Button
          text="Cancelar"
          type="cancel"
          onClick={() => {
            router.back();
          }}
        />
      </Grid>
      {!disabled && (
        <Grid item xs={9}>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              text={isSubmitting ? 'Cargando...' : 'Cargar Calificaciones'}
              type="edit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

Calificaciones.propTypes = {
  mode: PropTypes.oneOf(['Ordinarias', 'Extraordinarias']).isRequired,
  disabled: PropTypes.bool.isRequired,
  labelAsignatura: PropTypes.string.isRequired,
  alumnos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  grupoId: PropTypes.number.isRequired,
  asignaturaId: PropTypes.number.isRequired,
};
