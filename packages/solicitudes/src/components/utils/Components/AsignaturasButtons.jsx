import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useContext } from 'react';
import DeleteAsignatura from './AsignaturasModales/DeleteAsignatura';
import AsignaturasEditModal from './AsignaturasModales/AsignaturasEditModal';
import { TablesPlanEstudiosContext } from '../Context/tablesPlanEstudiosProviderContext';

export default function AsignaturasButtons({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    setFormAsignaturas,
    setAsignaturasList,
    asignaturasList,
    programaId,
  } = useContext(TablesPlanEstudiosContext);
  const rowItem = asignaturasList.find((item) => item.id === id);

  const handleModalOpen = (editMode) => {
    setIsEdit(editMode);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setFormAsignaturas(() => ({ programaId, tipo: 1 }));
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setFormAsignaturas(() => ({ programaId, tipo: 1 }));
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
        <AsignaturasEditModal
          hideModal={handleModalClose}
          rowItem={rowItem}
          open={modalOpen}
          edit={isEdit ? 'Modificar Asignatura' : 'Consultar Asignatura'}
        />
      )}

      {deleteDialogOpen && (
        <DeleteAsignatura
          modal={deleteDialogOpen}
          hideModal={handleDeleteDialogClose}
          id={rowItem.id}
          setAsignaturasList={setAsignaturasList}
        />
      )}
    </Stack>
  );
}

AsignaturasButtons.propTypes = {
  id: PropTypes.number.isRequired,
};
