import { IconButton, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function ButtonsDatosProyecto({ id }) {
  const router = useRouter();

  const handleConsult = () => {
    router.push(
      `/opds/fortalecimiento/planMaestro/DatosProyecto/${id}/consultDatosProyecto`,
    );
  };
  const handleEdit = () => {
    router.push(
      `/opds/fortalecimiento/planMaestro/DatosProyecto/${id}/editDatosProyecto`,
    );
  };
  const handleDelete = () => {
    console.log('Deleted tu culo');
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="Consultar" onClick={handleConsult}>
        <ListAltIcon />
      </IconButton>
      <IconButton aria-label="Editar" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Eliminar" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

ButtonsDatosProyecto.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
