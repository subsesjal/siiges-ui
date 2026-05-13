import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import mapUsersToRows from '../../utils/userRows';
import UsersActionIcons from '../UsersActionIcons';

function UsersTable({ data, loading, canEdit, onView, onEdit }) {
  const rows = useMemo(() => mapUsersToRows(data), [data]);

  const columns = useMemo(() => [
    { field: 'nombre', headerName: 'Nombre', width: 240 },
    { field: 'usuario', headerName: 'Usuario', width: 170 },
    { field: 'correo', headerName: 'Correo', width: 240 },
    { field: 'rol', headerName: 'Rol', width: 200 },
    { field: 'estatus', headerName: 'Estatus', width: 140 },
    { field: 'fecha', headerName: 'Fecha de alta', width: 160 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <UsersActionIcons
          canEdit={canEdit}
          onView={() => onView(params.row.raw)}
          onEdit={() => onEdit(params.row.raw)}
        />
      ),
    },
  ], [canEdit, onEdit, onView]);

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
    rowsPerPage: 'Filas por pagina:',
  };

  return (
    <Box sx={{ width: '100%', padding: 2, minHeight: 420 }}>
      <DataGrid
        localeText={localeText}
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        disableSelectionOnClick
      />
    </Box>
  );
}

UsersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default React.memo(UsersTable);