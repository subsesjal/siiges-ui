import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Link from 'next/link';

export default function ActionButtons({ consultar, editar, eliminar }) {
  const renderButton = (link, label, icon) => {
    if (link) {
      return (
        <Link href={link}>
          <IconButton aria-label={label}>{icon}</IconButton>
        </Link>
      );
    }
    return null;
  };

  return (
    <Stack direction="row" spacing={1}>
      {renderButton(consultar, 'consultar', <DescriptionIcon />)}
      {renderButton(editar, 'editar', <EditIcon />)}
      {eliminar && (
        <IconButton aria-label="eliminar" onClick={eliminar}>
          <DeleteIcon />
        </IconButton>
      )}
    </Stack>
  );
}

ActionButtons.propTypes = {
  editar: PropTypes.string.isRequired,
  consultar: PropTypes.string.isRequired,
  eliminar: PropTypes.func.isRequired,
};
