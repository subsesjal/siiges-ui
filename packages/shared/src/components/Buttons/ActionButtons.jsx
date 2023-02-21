import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Link from 'next/link';

export default function ActionButtons({ consultar, editar, eliminar }) {
  return (
    <Stack direction="row" spacing={1}>
      {consultar ? (
        <Link href={consultar}>
          <IconButton aria-label="consultar">
            <DescriptionIcon />
          </IconButton>
        </Link>
      ) : (
        <div />
      )}
      {editar ? (
        <Link href={editar}>
          <IconButton aria-label="editar">
            <EditIcon />
          </IconButton>
        </Link>
      ) : (
        <div />
      )}
      {eliminar ? (
        <IconButton aria-label="eliminar" onClick={eliminar}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <div />
      )}
    </Stack>
  );
}

ActionButtons.propTypes = {
  editar: PropTypes.string.isRequired,
  consultar: PropTypes.string.isRequired,
  eliminar: PropTypes.func.isRequired,
};
