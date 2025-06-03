import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useContext } from 'react';
import DeleteAsignatura from './AsignaturasModales/DeleteAsignatura';
import AsignaturasEditModal from './AsignaturasModales/AsignaturasEditModal';
import { TablesPlanEstudiosContext } from '../Context/tablesPlanEstudiosProviderContext';

export default function AsignaturasButtons({ id, isDisabled }) {
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
  isDisabled: PropTypes.bool.isRequired,
};
