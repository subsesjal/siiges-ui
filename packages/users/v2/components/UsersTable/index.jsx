import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@siiges-ui/shared';
import mapUsersToRows from '../../utils/userRows';
import UsersActionIcons from '../UsersActionIcons';

function UsersTable({
  data,
  loading,
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
  canCreate,
  onCreate,
  onReload,
  pagination,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sortModel,
  onSortModelChange,
  onSearch,
}) {
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
          canDelete={canDelete}
          onView={() => onView(params.row.raw)}
          onEdit={() => onEdit(params.row.raw)}
          onDelete={() => onDelete(params.row.raw)}
        />
      ),
    },
  ], [canDelete, canEdit, onDelete, onEdit, onView]);

  return (
    <DataTable
      rows={rows}
      columns={columns}
      buttonAdd={canCreate}
      buttonText="Agregar usuario"
      buttonClick={onCreate}
      buttonType="add"
      onReloadClick={onReload}
      loading={loading}
      paginationMode="server"
      rowCount={pagination.total}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortModel={sortModel}
      onSortModelChange={onSortModelChange}
      onSearch={onSearch}
    />
  );
}

UsersTable.defaultProps = {
  canDelete: false,
  onDelete: () => {},
  canCreate: false,
  onCreate: () => {},
  onReload: () => {},
  pagination: { total: 0 },
  page: 0,
  pageSize: 10,
  onPageChange: () => {},
  onPageSizeChange: () => {},
  sortModel: [],
  onSortModelChange: () => {},
  onSearch: () => {},
};

UsersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  canCreate: PropTypes.bool,
  onCreate: PropTypes.func,
  onReload: PropTypes.func,
  pagination: PropTypes.shape({ total: PropTypes.number }),
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  sortModel: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    sort: PropTypes.oneOf(['asc', 'desc']),
  })),
  onSortModelChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default React.memo(UsersTable);
