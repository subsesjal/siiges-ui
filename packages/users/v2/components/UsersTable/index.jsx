import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@siiges-ui/shared';
import mapUsersToRows from '../../utils/userRows';
import UsersActionIcons from '../UsersActionIcons';

function UsersTable({
  data, loading, canEdit, onView, onEdit, canCreate, onCreate, onReload,
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
          onView={() => onView(params.row.raw)}
          onEdit={() => onEdit(params.row.raw)}
        />
      ),
    },
  ], [canEdit, onEdit, onView]);

  return (
    <DataTable
      rows={rows}
      columns={columns}
      loading={loading}
      buttonAdd={canCreate}
      buttonText="Nuevo usuario"
      buttonClick={onCreate}
      buttonType="add"
      onReloadClick={onReload}
    />
  );
}

UsersTable.defaultProps = {
  canCreate: false,
  onCreate: () => {},
  onReload: () => {},
};

UsersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  canCreate: PropTypes.bool,
  onCreate: PropTypes.func,
  onReload: PropTypes.func,
};

export default React.memo(UsersTable);
