import Tooltip from '@mui/material/Tooltip';
import { ButtonsModal, DataTable, DefaultModal } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function BecasTable({ becas, institucion }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const handleViewClick = (row) => {
    router.push({
      pathname: `/serviciosEscolares/becas/${row.id}/consultar`,
      query: {
        institucion: JSON.stringify(institucion),
      },
    }, `/serviciosEscolares/becas/${row.id}/consultar`);
  };

  const handleEditClick = (row) => {
    router.push({
      pathname: `/serviciosEscolares/becas/${row.id}/editar`,
      query: {
        institucion: JSON.stringify(institucion),
      },
    }, `/serviciosEscolares/becas/${row.id}/editar`);
  };

  const handleDeleteClick = (row) => {
    setId(row.id);
    setOpen(true);
  };

  const columns = [
    { field: 'folio', headerName: 'Folio de reporte', width: 200 },
    { field: 'fechaReporte', headerName: 'Fecha de reporte', width: 400 },
    { field: 'estatus', headerName: 'Estatus', width: 200 },
    { field: 'rvoe', headerName: 'RVOE', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Consultar" placement="top">
            <IconButton onClick={() => handleViewClick(params.row)} title="Consultar">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <IconButton onClick={() => handleEditClick(params.row)} title="Editar">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" placement="top">
            <IconButton onClick={() => handleDeleteClick(params.row)} title="Borrar">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <DataTable
        buttonAdd
        buttonText="Agregar Reporte"
        buttonClick={() => router.push({
          pathname: '/serviciosEscolares/becas/crear',
          query: {
            institucion: JSON.stringify(institucion),
          },
        }, '/serviciosEscolares/becas/crear')}
        rows={becas}
        columns={columns}
      />
      <DefaultModal open={open} setOpen={setOpen} title="Eliminar Registro de Beca">
        <Typography variant="h6">¿Esta seguro de querer eliminar este registro de beca?</Typography>
        <ButtonsModal
          confirm={() => {
            console.log('Beca eliminada: ', id);
          }}
          cancel={() => {
            setOpen(false);
          }}
          eliminate
        />
      </DefaultModal>
    </>
  );
}

BecasTable.propTypes = {
  becas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      folio: PropTypes.string.isRequired,
      fechaReporte: PropTypes.string.isRequired,
      estatus: PropTypes.string.isRequired,
      rvoe: PropTypes.string.isRequired,
    }),
  ).isRequired,
  institucion: PropTypes.shape({
    selectedInstitucion: PropTypes.number,
    selectedRvoe: PropTypes.string,
  }).isRequired,
};
