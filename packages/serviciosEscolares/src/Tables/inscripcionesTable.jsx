import React from 'react';
import {
  Checkbox, Tooltip, Stack, Typography,
} from '@mui/material';
import ActionsAsignaturas from '../Components/utils/ActionsAsignaturas';

const columnsAsignaturas = (handleCheckboxChange, selectedAsignaturas, allIds, handleSelectAll) => [
  { field: 'clave', headerName: 'Clave', width: 100 },
  { field: 'seriacion', headerName: 'Seriación', width: 200 },
  { field: 'nombre', headerName: 'Asignatura', width: 650 },
  {
    field: 'actions',
    headerName: 'Acciones',
    disableColumnMenu: true,
    width: 150,
    headerAlign: 'center',
    renderHeader: () => (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Typography>Acciones</Typography>
        <Tooltip title="Seleccionar/Deseleccionar todos">
          <Checkbox
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={allIds.length > 0 && selectedAsignaturas.length === allIds.length}
            indeterminate={
              selectedAsignaturas.length > 0 && selectedAsignaturas.length < allIds.length
            }
          />
        </Tooltip>
      </Stack>
    ),
    renderCell: (params) => (
      <ActionsAsignaturas
        id={params.id}
        onCheckboxChange={handleCheckboxChange}
        selectedAsignaturas={selectedAsignaturas}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAsignaturas;
