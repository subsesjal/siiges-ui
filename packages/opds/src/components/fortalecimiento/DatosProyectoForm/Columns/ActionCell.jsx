import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack } from '@mui/material';
import Modal from '../Modal';

function ActionCell({ id }) {
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    disabled: false,
    edit: true,
    confirmAction: () => { },
  });

  const handleConsultar = () => {
    setModalState({
      open: true,
      title: 'Consultar Datos del Proyecto',
      disabled: true,
      edit: false,
      confirmAction: () => { },
    });
  };

  const handleEditar = () => {
    setModalState({
      open: true,
      title: 'Editar Datos del Proyecto',
      disabled: false,
      edit: true,
      confirmAction: () => console.log('Guardar cambios'),
    });
  };

  const handleEliminar = () => {
    console.log('eliminar', id);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Tooltip title="Consultar" placement="top">
          <IconButton aria-label="Consultar" onClick={handleConsultar}>
            <ListAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar" placement="top">
          <IconButton aria-label="Editar" onClick={handleEditar}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar" placement="top">
          <IconButton aria-label="Eliminar" onClick={handleEliminar}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Modal id={id} modalState={modalState} setModalState={setModalState} />
    </>
  );
}

ActionCell.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ActionCell;
