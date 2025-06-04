import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { IconButton, Link } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

const getColumns = () => {
  const columns = [
    { field: 'folio', headerName: 'Folio de captura', width: 150 },
    { field: 'planEstudios', headerName: 'Plan de estudios', width: 170 },
    { field: 'status', headerName: 'Estatus', width: 280 },
    { field: 'plantel', headerName: 'Plantel', width: 180 },
    { field: 'instituciones', headerName: 'Instituciones', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: (params) => (
        !params.row.isAssigned ? (
          <Link href={`/inspecciones/asignacionInspecciones/${params.id}`}>
            <Tooltip title="Asignar Inspección" placement="top">
              <IconButton aria-label="Asignar Inspecciones">
                <PostAddIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <span>Asignado</span>
        )
      ),
    },
  ];

  return columns;
};

export default getColumns;
