import React, { useContext } from 'react';
import { Context, DataTable } from '@siiges-ui/shared';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

export default function SolicitudServSocTable({ data, tableEnabled }) {
  const { loading } = useContext(Context);

  const handleViewClick = (row) => console.log('Consultar', row);
  const handleEditClick = (row) => console.log('Editar', row);
  const handleDeleteClick = (row) => console.log('Borrar', row);

  const columns = [
    { field: 'folioSolicitud', headerName: 'Folio de solicitud', width: 200 },
    { field: 'programaId', headerName: 'Programa', width: 200 },
    { field: 'estatus', headerName: 'Estatus', width: 250 },
    { field: 'fechaSolicitud', headerName: 'Fecha de solicitud', width: 250 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleViewClick(params.row)} title="Consultar">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEditClick(params.row)} title="Editar">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)} title="Borrar">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataTable
      title="Lista de solicitudes"
      rows={data || []}
      columns={columns}
      loading={loading}
      buttonAdd
      buttonText="Agregar Solicitud"
      buttonDisabled={!tableEnabled || loading}
      buttonClick={() => console.log('Botón Agregar Solicitud presionado')}
      buttonType="primary"
    />
  );
}

SolicitudServSocTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      folioSolicitud: PropTypes.string.isRequired,
      programaId: PropTypes.string.isRequired,
      estatus: PropTypes.string.isRequired,
      fechaSolicitud: PropTypes.string.isRequired,
    }),
  ).isRequired,
  tableEnabled: PropTypes.bool.isRequired,
};
