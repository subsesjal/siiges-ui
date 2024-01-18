import React from 'react';
import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function ButtonsOrganosColegiados({ id }) {
  const router = useRouter();
  const handleButtonClick = (title) => {
    router.push(`/opds/organosColegiados/${id}/${title}`);
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="Editar"
        onClick={() => handleButtonClick('editar')}
      >
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Eliminar">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

ButtonsOrganosColegiados.propTypes = {
  id: PropTypes.number.isRequired,
};
