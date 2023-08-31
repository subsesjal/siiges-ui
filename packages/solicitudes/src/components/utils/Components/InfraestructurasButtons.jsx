import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useContext } from 'react';
import PlantelContext from '../Context/plantelContext';
import DeleteInfraestructura from './InfraestructuraModales/DeleteInfraestructura';
import InfraestructuraEditModal from './InfraestructuraModales/InfraestructuraEditModal';

export default function InfraestructurasButtons({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { infraestructuras } = useContext(PlantelContext);
  const rowItem = infraestructuras.find((item) => item.id === id);

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
        <InfraestructuraEditModal
          hideModal={handleModalClose}
          rowItem={rowItem}
          open={modalOpen}
          edit={isEdit ? 'Editar Infraestructura' : 'Consultar Infraestructura'}
        />
      )}

      {deleteDialogOpen && (
        <DeleteInfraestructura
          modal={deleteDialogOpen}
          hideModal={handleDeleteDialogClose}
          rowItem={rowItem}
        />
      )}
    </Stack>
  );
}

InfraestructurasButtons.propTypes = {
  id: PropTypes.number.isRequired,
  rowItem: PropTypes.shape({
    programaID: PropTypes.number,
  }).isRequired,
};
