import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAcuerdos from '../modalAcuerdos';

export default function ButtonsAcuerdos({ id }) {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleButtonClick = (title) => {
    setOpen(true);
    setModalTitle(title);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="Consultar" onClick={() => handleButtonClick('Consultar Acuerdo')}>
          <ListAltIcon />
        </IconButton>
        <IconButton aria-label="Editar" onClick={() => handleButtonClick('Editar Acuerdo')}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Eliminar">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <ModalAcuerdos open={open} setOpen={setOpen} title={modalTitle} id={id} />
    </>
  );
}

ButtonsAcuerdos.propTypes = {
  id: PropTypes.number.isRequired,
};
