import { IconButton, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function ButtonsPlanMaestro({ id }) {
  const router = useRouter();
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="Consultar"
        onClick={() => {
          router.push(`/opds/fortalecimiento/planMaestro/${id}/consultPlanMaestro`);
        }}
      >
        <ListAltIcon />
      </IconButton>
      <IconButton
        aria-label="Editar"
        onClick={() => {
          router.push(`/opds/fortalecimiento/planMaestro/${id}/editPlanMaestro`);
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Eliminar">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

ButtonsPlanMaestro.propTypes = {
  id: PropTypes.number.isRequired,
};
