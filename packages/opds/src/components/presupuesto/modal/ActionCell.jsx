import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack } from '@mui/material';
import Modal from '@siiges-ui/opds/src/components/presupuesto/modal';

function ActionCell({
  params,
  setRowsData,
  SetCreateRow,
}) {
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    disabled: false,
    edit: true,
    confirmAction: () => {},
  });

  const handleConsultar = () => {
    setModalState({
      open: true,
      title: 'Consultar Datos',
      disabled: true,
      edit: false,
      confirmAction: () => {},
    });
  };

  const handleEditar = () => {
    setModalState({
      open: true,
      title: 'Editar Datos',
      disabled: false,
      edit: true,
      confirmAction: () => console.log('Guardar cambios'),
    });
  };

  const handleEliminar = () => {
    console.log('eliminar');
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="Consultar" onClick={handleConsultar}>
          <ListAltIcon />
        </IconButton>
        <IconButton aria-label="Editar" onClick={handleEditar}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Eliminar" onClick={handleEliminar}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        setRowsData={setRowsData}
        SetCreateRow={SetCreateRow}
        params={params}
        tipoEgresoId={params?.tipoEgresoId}
        id={params?.id}
      />
    </>
  );
}

ActionCell.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cantidad: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tipoEgresoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tipoPresupuestoId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    tipoRecursoPresupuestoId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  setRowsData: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  SetCreateRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default ActionCell;
