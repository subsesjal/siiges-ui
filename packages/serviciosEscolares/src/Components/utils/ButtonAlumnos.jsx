import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

export default function ButtonsAlumnos({ id, url }) {
  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <>
          <Link href={`/serviciosEscolares/alumnos/${id}/HistorialAlumno`} passHref>
            <IconButton aria-label="Historial Académico del Alumno" component="a">
              <VisibilityOutlinedIcon />
            </IconButton>
          </Link>
          <Link href={url} passHref>
            <IconButton aria-label="Editar Alumno" component="a">
              <EditIcon />
            </IconButton>
          </Link>
        </>
      )}
    </Stack>
  );
}

ButtonsAlumnos.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
