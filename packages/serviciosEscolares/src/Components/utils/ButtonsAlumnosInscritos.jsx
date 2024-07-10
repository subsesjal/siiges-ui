import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { getInscripcionesAlumnos } from '@siiges-ui/instituciones';
import { Context } from '@siiges-ui/shared';
import ModalAlumnosInscritos from './ModalAlumnosInscritos';

export default function ButtonsAlumnosInscritos({ id, asignaturas, grupoId }) {
  const { setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedAlumnoAsignaturas, setSelectedAlumnoAsignaturas] = useState(
    [],
  );

  useEffect(() => {
    if (grupoId) {
      getInscripcionesAlumnos(grupoId, (error, result) => {
        if (!error && result.inscripciones) {
          const filteredAsignaturas = result.inscripciones
            .filter((item) => item.alumnoId === id)
            .map((item) => item.alumnoAsignaturas)
            .flat();

          setSelectedAlumnoAsignaturas(filteredAsignaturas);
        }
        if (error) {
          console.error('Failed to fetch inscripciones:', error);
          setNoti({
            open: true,
            message:
              'Algo salió mal al inscribir el alumno, reintente más tarde',
            type: 'error',
          });
        }
      });
    }
  }, [grupoId, id]);

  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="Consultar"
          onClick={() => {
            setTitle('Consultar Alumno');
            setOpen(true);
          }}
        >
          <ListAltIcon />
        </IconButton>
        <IconButton
          aria-label="Editar"
          onClick={() => {
            setTitle('Editar Alumno');
            setOpen(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Eliminar">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <ModalAlumnosInscritos
        alumnoId={id}
        grupoId={grupoId}
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
        asignaturas={asignaturas}
        title={title}
        alumnoAsignaturas={selectedAlumnoAsignaturas}
      />
    </>
  );
}

ButtonsAlumnosInscritos.propTypes = {
  id: PropTypes.number.isRequired,
  grupoId: PropTypes.number.isRequired,
  asignaturas: PropTypes.arrayOf(PropTypes.string).isRequired,
};
