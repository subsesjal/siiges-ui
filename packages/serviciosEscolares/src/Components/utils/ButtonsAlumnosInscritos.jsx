import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAlumnosInscritos from './ModalAlumnosInscritos';

export default function ButtonsAlumnosInscritos({
  id,
  asignaturas,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [checkedIDs, setCheckedIDs] = useState([]);

  const handleCheckboxChange = (isChecked) => {
    setCheckedIDs((prevIDs) => {
      if (isChecked) {
        return [...prevIDs, id];
      }
      return prevIDs.filter((item) => item !== id);
    });
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="Consultar"
          onClick={() => {
            setTitle('Consultar Alumno');
            setOpen(true);
          }}
        >
          <ListAltIcon />
        </IconButton>
        <IconButton
          aria-label="Editar"
          onClick={() => {
            setTitle('Editar Alumno');
            setOpen(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Eliminar">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <ModalAlumnosInscritos
        id={id}
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
        asignaturas={asignaturas}
        title={title}
        handleCheckboxChange={handleCheckboxChange}
        checkedIDs={checkedIDs}
      />
    </>
  );
}

ButtonsAlumnosInscritos.propTypes = {
  id: PropTypes.number.isRequired,
  asignaturas: PropTypes.arrayOf(PropTypes.string).isRequired,
};
