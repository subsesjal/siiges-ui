import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteInstitucionesAledanas from './InstitucionesAledanas/DeleteInstitucionesAledanas';
import InstitucionAledanaEditModal from './InstitucionesAledanas/InstitucionAledanaEditModal';
import PlantelContext from '../Context/plantelContext';

export default function InstitucionesAledanasButtons({ id, type, isDisabled }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { institucionesAledanas, setInstitucionesAledanas } = useContext(PlantelContext);
  const rowItem = institucionesAledanas.find((item) => item.id === id)
    ? {
      id: institucionesAledanas.find((item) => item.id === id).id,
      nombre: institucionesAledanas.find((item) => item.id === id).nombre,
      tiempo: institucionesAledanas.find((item) => item.id === id).tiempo,
    }
    : null;

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
      {!isDisabled && (
      <>
        <IconButton aria-label="editar" onClick={() => handleModalOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="eliminar" onClick={handleDeleteDialogOpen}>
          <DeleteIcon />
        </IconButton>
      </>
      )}

      {modalOpen && (
        <InstitucionAledanaEditModal
          hideModal={handleModalClose}
          rowItem={rowItem}
          open={modalOpen}
          edit={
            isEdit
              ? 'Modificar Instituciones Aledañas'
              : 'Consultar Instituciones Aledañas'
          }
        />
      )}

      {deleteDialogOpen && (
        <DeleteInstitucionesAledanas
          modal={deleteDialogOpen}
          hideModal={handleDeleteDialogClose}
          setInstitucionesAledanas={setInstitucionesAledanas}
          id={rowItem.id}
        />
      )}
    </Stack>
  );
}

InstitucionesAledanasButtons.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  rowItem: PropTypes.shape({
    programaID: PropTypes.number,
  }).isRequired,
};
