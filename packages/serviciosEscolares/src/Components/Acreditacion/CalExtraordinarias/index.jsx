import { Box, Grid } from '@mui/material';
import { Button, Context, DataTable } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import columnsInscritosExtra from '../../../Tables/columnsInscritosEdit';
import submitCalificaciones from '../../utils/submitCalificaciones';

export default function CalExtraordinarias({
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

  const router = useRouter();

  const validateCalificaciones = () => {
    if (calificaciones.length === 0) {
      return false;
    }
    return calificaciones.every(
      (c) => c.alumnoId != null
        && c.calificacion != null
        && c.calificacion.trim() !== ''
        && c.fechaExamen != null
        && c.fechaExamen.trim() !== '',
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
      2,
      setResponse,
    );
    setIsSubmitting(false);
    console.log(response);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title={labelAsignatura}
          rows={alumnos}
          columns={columnsInscritosExtra(disabled, updateCalificaciones)}
        />
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

CalExtraordinarias.propTypes = {
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
