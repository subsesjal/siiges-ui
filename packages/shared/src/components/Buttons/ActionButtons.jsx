import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Link from 'next/link';

export default function ActionButtons({ id, consultar, editar }) {
  return (
    <Stack direction="row" spacing={1}>
      <Link href={consultar}>
        <IconButton aria-label="consultar">
          <DescriptionIcon />
        </IconButton>
      </Link>
      <Link href={editar}>
        <IconButton aria-label="editar">
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton aria-label="eliminar" onClick={id}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

ActionButtons.propTypes = {
  id: PropTypes.number.isRequired,
  editar: PropTypes.string.isRequired,
  consultar: PropTypes.string.isRequired,
};
