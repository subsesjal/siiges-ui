import { IconButton, Stack } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

export default function UsuariosActions({ id, url }) {
  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Link href={url}>
          <IconButton aria-label="consultar">
            <ListAltIcon />
          </IconButton>
        </Link>
      )}
    </Stack>
  );
}

UsuariosActions.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
