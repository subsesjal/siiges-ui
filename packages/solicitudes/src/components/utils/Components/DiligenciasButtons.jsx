import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import DeleteDiligencia from './DiligenciasModales/DeleteDiligencia';
import DiligenciasFormModal from './DiligenciasModales/DiligenciasFormModal';

export default function DiligenciasButtons({ id }) {
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

  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="consultar" onClick={() => handleModalOpen(false)}>
        <DescriptionIcon />
      </IconButton>
      <IconButton aria-label="editar" onClick={() => handleModalOpen(true)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="eliminar" onClick={handleDeleteDialogOpen}>
        <DeleteIcon />
      </IconButton>

      {modalOpen && (
        <DiligenciasFormModal
          open={modalOpen}
          hideModal={handleModalClose}
          mode={isEdit ? 'edit' : 'consult'}
          title={isEdit ? 'Editar Diligencia' : 'Consultar Diligencia'}
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
};
