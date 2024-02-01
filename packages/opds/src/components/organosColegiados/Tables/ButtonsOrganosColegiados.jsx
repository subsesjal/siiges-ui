import React from 'react';
import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function ButtonsOrganosColegiados({ params }) {
  const router = useRouter();
  const institucion = params?.institucion?.nombre || 'Universidad de Jalisco';
  const periodo = params?.periodo.descripcion;
  const sesion = params?.sesion.descripcion;
  const handleButtonClick = (title) => {
    router.push({
      pathname: `/opds/organosColegiados/${params?.id}/${title}`,
      query: { institucion, periodo, sesion },
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="Editar"
        onClick={() => handleButtonClick('editar')}
      >
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Eliminar">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

ButtonsOrganosColegiados.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.number, // Asumiendo que id es un número, ajusta según sea necesario
    institucion: PropTypes.shape({
      nombre: PropTypes.string,
    }),
    periodo: PropTypes.shape({
      descripcion: PropTypes.string,
    }),
    sesion: PropTypes.shape({
      descripcion: PropTypes.string,
    }),
  }).isRequired, // Marca params como requerido
};
