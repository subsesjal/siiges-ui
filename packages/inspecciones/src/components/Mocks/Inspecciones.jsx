import React from 'react';
import { IconButton, Link } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

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
      <Link href={`/inspecciones/asignacionInspecciones/${params.id}`}>
        <IconButton aria-label="Asignar Inspecciones">
          <PostAddIcon />
        </IconButton>
      </Link>
    ),
  },
];

export default columns;
