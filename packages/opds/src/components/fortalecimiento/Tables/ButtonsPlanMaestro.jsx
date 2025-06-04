import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function ButtonsPlanMaestro({ id }) {
  const router = useRouter();
  return (

    <Stack direction="row" spacing={1}>
      <Tooltip title="Consultar" placement="top">
        <IconButton
          aria-label="Consultar"
          onClick={() => {
            router.push(`/opds/fortalecimiento/planMaestro/${id}/consultPlanMaestro`);
          }}
        >
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar" placement="top">
        <IconButton
          aria-label="Editar"
          onClick={() => {
            router.push(`/opds/fortalecimiento/planMaestro/${id}/editPlanMaestro`);
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar" placement="top">
        <IconButton aria-label="Eliminar">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

ButtonsPlanMaestro.propTypes = {
  id: PropTypes.number.isRequired,
};
