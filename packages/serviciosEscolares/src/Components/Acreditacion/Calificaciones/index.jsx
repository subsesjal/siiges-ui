import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import {
  Button,
  Context,
  DataTable,
  getData,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import columnsInscritosOrdinario from '../../../Tables/columnsInscritosOrdinario';
import columnsInscritosExtra from '../../../Tables/columnsInscritosExtra';
import submitCalificaciones from '../../utils/submitCalificaciones';
import getAlumnosAcreditacion from '../../utils/getAlumnosAcreditacion';

export default function Calificaciones({
  mode,
  disabled,
  labelAsignatura,
  alumnos,
  grupoId,
  asignaturaId,
  programaId,
  setAlumnos,
}) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState();
  const [calificacionMinima, setCalificacionMinima] = useState(null);
  const { setNoti } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    const fetchCalificacionMinima = async () => {
      try {
        const result = await getData({ endpoint: `/programas/${programaId}` });
        if (result.statusCode === 200) {
          setCalificacionMinima(result.data.calificacionAprobatoria);
        } else {
          setNoti({
            open: true,
            message: '¡Error al obtener la calificación mínima!.',
            type: 'error',
          });
        }
      } catch (error) {
        setNoti({
          open: true,
          message: '¡Error al obtener la calificación mínima!',
          type: 'error',
        });
      }
    };

    if (programaId) {
      fetchCalificacionMinima();
    }
  }, [programaId]);

  useEffect(() => {
    if (response) {
      const reloadAlumnos = async () => {
        try {
          const alumnosActualizados = await getAlumnosAcreditacion(asignaturaId, grupoId);
          if (alumnosActualizados) {
            setAlumnos(alumnosActualizados);
            setNoti({
              open: true,
              message: '¡Datos actualizados correctamente!',
              type: 'success',
            });
          } else {
            setNoti({
              open: true,
              message: '¡Error al actualizar los datos!',
              type: 'error',
            });
          }
        } catch (error) {
          setNoti({
            open: true,
            message: '¡Error al actualizar los datos!',
            type: 'error',
          });
        }
      };
      reloadAlumnos();
    }
  }, [response]);

  const isExtraordinarioEnabled = (alumnoId) => {
    const alumno = alumnos.find((a) => a.id === alumnoId);
    return alumno && alumno.calificaciones.length === 2;
  };

  const updateCalificaciones = (alumnoId, newValue, fieldToUpdate, tipo = 1) => {
    setCalificaciones((prevCalificaciones) => {
      const existingIndex = prevCalificaciones.findIndex(
        (c) => c.alumnoId === alumnoId && c.tipo === tipo,
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
          tipo,
          calificacion: fieldToUpdate === 'calificacion' ? newValue : '',
          fechaExamen: fieldToUpdate === 'fechaExamen' ? newValue : '',
        },
      ];
    });
  };

  const handleSubmit = async () => {
    const calificacionesValidas = calificaciones.filter((c) => {
      const alumno = alumnos.find((a) => a.id === c.alumnoId);
      return alumno && alumno.situacionId === 1 && c.calificacion.trim() !== '';
    });

    const calificacionesInvalidas = calificaciones.filter((c) => {
      const alumno = alumnos.find((a) => a.id === c.alumnoId);
      return alumno && alumno.situacionId !== 1;
    });

    if (calificacionesValidas.length === 0) {
      setNoti({
        open: true,
        message: '¡No hay calificaciones válidas para subir!',
        type: 'error',
      });
      return;
    }

    if (calificacionesInvalidas.length > 0) {
      const alumnosInvalidos = calificacionesInvalidas.map((c) => {
        const alumno = alumnos.find((a) => a.id === c.alumnoId);
        return alumno.persona.nombre;
      }).join(', ');

      setTimeout(() => {
        setNoti({
          open: true,
          message: `¡No se pueden subir calificaciones para los alumnos debido a su situación!: ${alumnosInvalidos}.`,
          type: 'error',
        });
      }, 3500);
    }

    setIsSubmitting(true);

    const calificacionesOrdinarias = calificacionesValidas.filter((c) => c.tipo === 1);
    if (calificacionesOrdinarias.length > 0) {
      await submitCalificaciones(
        calificacionesOrdinarias,
        setNoti,
        grupoId,
        asignaturaId,
        1,
        setResponse,
      );
    }

    const calificacionesExtraordinarias = calificacionesValidas.filter(
      (c) => c.tipo === 2 || parseFloat(c.calificacion) < calificacionMinima,
    )
      .map((c) => ({
        ...c,
        calificacion: c.tipo === 2 ? c.calificacion : '',
        tipo: 2,
      }));

    if (calificacionesExtraordinarias.length > 0) {
      await submitCalificaciones(
        calificacionesExtraordinarias,
        setNoti,
        grupoId,
        asignaturaId,
        2,
        setResponse,
      );
    }
    setIsSubmitting(false);
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
      situacionId: PropTypes.number.isRequired,
      situacionValidacionId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  grupoId: PropTypes.number.isRequired,
  asignaturaId: PropTypes.number.isRequired,
  programaId: PropTypes.number.isRequired,
  setAlumnos: PropTypes.func.isRequired,
};
