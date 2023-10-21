import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

export default function ButtonsAlumnos({ id, url }) {
  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Link href={url}>
          <IconButton aria-label="Editar Alumno">
            <EditIcon />
          </IconButton>
        </Link>
      )}
    </Stack>
  );
}

ButtonsAlumnos.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
