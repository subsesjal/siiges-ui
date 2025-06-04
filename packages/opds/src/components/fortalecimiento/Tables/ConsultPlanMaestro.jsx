import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function ConsultPlanMaestro() {
  return (
    <Tooltip title="Consultar" placement="top">
      <IconButton aria-label="Consultar">
        <VisibilityOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
