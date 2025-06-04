import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import DeleteDiligencia from './DiligenciasModales/DeleteDiligencia';
import DiligenciasFormModal from './DiligenciasModales/DiligenciasFormModal';

export default function DiligenciasButtons({ id, type, isDisabled }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleModalOpen = (editMode) => {
    setIsEdit(editMode);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  if (type === 'consultar') {
    return null;
  }
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Consultar" placement="top">
        <IconButton aria-label="consultar" onClick={() => handleModalOpen(false)}>
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>
      {!isDisabled && (
        <>
          <Tooltip title="Editar" placement="top">
            <IconButton aria-label="editar" onClick={() => handleModalOpen(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" placement="top">
            <IconButton aria-label="eliminar" onClick={handleDeleteDialogOpen}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      {modalOpen && (
        <DiligenciasFormModal
          open={modalOpen}
          hideModal={handleModalClose}
          mode={isEdit ? 'edit' : 'consult'}
          title={isEdit ? 'Modificar Diligencia' : 'Consultar Diligencia'}
          id={id}
        />
      )}

      {deleteDialogOpen && (
        <DeleteDiligencia
          modal={deleteDialogOpen}
          hideModal={handleDeleteDialogClose}
          id={id}
        />
      )}
    </Stack>
  );
}

DiligenciasButtons.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
