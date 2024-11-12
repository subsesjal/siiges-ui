import { IconButton, Stack } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

export default function ButtonsValidacion({
  id, url, programa, institucion,
}) {
  const linkUrl = `${url}?id=${id}&programa=${programa}&institucion=${institucion}`;

  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Link href={linkUrl} passHref>
          <IconButton aria-label="Validar Alumno en misma pestaña" component="a">
            <PlaylistAddCheckIcon />
          </IconButton>
        </Link>
      )}
    </Stack>
  );
}

ButtonsValidacion.propTypes = {
  id: PropTypes.number.isRequired,
  programa: PropTypes.number.isRequired,
  institucion: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
