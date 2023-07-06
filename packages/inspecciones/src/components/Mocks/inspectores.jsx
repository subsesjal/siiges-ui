import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 660 },
  { field: 'activas', headerName: 'Inspecciones activas', width: 170 },
  { field: 'realizadas', headerName: 'Inspecciones realizadas', width: 170 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => (
      <Link href={`/${params.id}`}>
        <IconButton aria-label="consultar">
          <AddIcon />
        </IconButton>
      </Link>
    ),
  },
];

const rows = [
  {
    id: 1,
    nombre: 'ASIGNACION INSPECCION FISICA',
    activas: '339',
    realizadas: '5',
  },
  {
    id: 2,
    nombre: 'ASIGNACION INSPECCION FISICA',
    activas: '339',
    realizadas: '5',
  },
  {
    id: 3,
    nombre: 'ASIGNACION INSPECCION FISICA',
    activas: '339',
    realizadas: '5',
  },
];

export { rows, columns };
