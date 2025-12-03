import React from 'react';
import { Stack, Tooltip, IconButton } from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadIcon from '@mui/icons-material/Download';

export default function ButtonsReporteFoliosAsig() {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Consultar" placement="top">
        <IconButton aria-label="Consultar Folio">
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar" placement="top">
        <IconButton aria-label="Eliminar Folio">
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
