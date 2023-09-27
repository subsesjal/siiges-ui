import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteInstitucionesAledanas from './InstitucionesAledanas/DeleteInstitucionesAledanas';
import InstitucionAledanaEditModal from './InstitucionesAledanas/InstitucionAledanaEditModal';
import PlantelContext from '../Context/plantelContext';

export default function InstitucionesAledanasButtons({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { institucionesAledanas } = useContext(PlantelContext);
  const rowItem = institucionesAledanas.find((item) => item.id === id);

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
      <IconButton aria-label="editar" onClick={() => handleModalOpen(true)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="eliminar" onClick={handleDeleteDialogOpen}>
        <DeleteIcon />
      </IconButton>

      {modalOpen && (
        <InstitucionAledanaEditModal
          hideModal={handleModalClose}
          rowItem={rowItem}
          open={modalOpen}
          edit={
            isEdit
              ? 'Editar Instituciones Aledañas'
              : 'Consultar Instituciones Aledañas'
          }
        />
      )}

      {deleteDialogOpen && (
        <DeleteInstitucionesAledanas
          modal={deleteDialogOpen}
          hideModal={handleDeleteDialogClose}
          rowItem={rowItem}
        />
      )}
    </Stack>
  );
}

InstitucionesAledanasButtons.propTypes = {
  id: PropTypes.number.isRequired,
  rowItem: PropTypes.shape({
    programaID: PropTypes.number,
  }).isRequired,
};
