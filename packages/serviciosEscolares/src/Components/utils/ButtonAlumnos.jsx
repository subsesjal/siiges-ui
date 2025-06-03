import Tooltip from '@mui/material/Tooltip';
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
            <Tooltip title="Consultar" placement="top">
              <IconButton aria-label="Historial Académico del Alumno" component="a">
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link href={url} passHref>
            <Tooltip title="Editar" placement="top">
              <IconButton aria-label="Editar Alumno" component="a">
                <EditIcon />
              </IconButton>
            </Tooltip>
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
