import { IconButton, Stack } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function ButtonsPlanMaestro() {
  const router = useRouter();
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="Consultar"
        onClick={() => {
          router.push('/opds/fortalecimiento/planMaestro/1/consultPlanMaestro');
        }}
      >
        <ListAltIcon />
      </IconButton>
      <IconButton
        aria-label="Editar"
        onClick={() => {
          router.push('/opds/fortalecimiento/planMaestro/1/editPlanMaestro');
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
