import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Context } from '@siiges-ui/shared';

const ALLOWED_IDS = [2519, 336];

function isAuthorized(session) {
  return (
    session?.rol === 'admin'
    || ALLOWED_IDS.includes(Number(session?.id))
  );
}

export default function ButtonsValidacion({
  id, url, programa, institucion,
}) {
  const { session } = useContext(Context);
  const linkUrl = `${url}?id=${id}&programa=${programa}&institucion=${institucion}`;

  if (!isAuthorized(session)) return null;

  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Link href={linkUrl} passHref>
          <Tooltip title="Validar Alumno" placement="top">
            <IconButton aria-label="Validar Alumno en misma pestaña" component="a">
              <PlaylistAddCheckIcon />
            </IconButton>
          </Tooltip>
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
