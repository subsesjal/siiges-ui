import { IconButton, Stack } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function ActionsAcreditacionAsignaturas({ id, grupoId }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(
      {
        pathname: path,
        query: { asignaturaId: id, grupoId },
      },
      path,
      { shallow: true },
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="Consultar"
        onClick={() => navigateTo('/serviciosEscolares/acreditacion/ConsultarAsignatura')}
      >
        <VisibilityOutlinedIcon />
      </IconButton>
      <IconButton
        aria-label="Editar"
        onClick={() => navigateTo('/serviciosEscolares/acreditacion/EditarAsignatura')}
      >
        <EditIcon />
      </IconButton>
    </Stack>
  );
}

ActionsAcreditacionAsignaturas.propTypes = {
  id: PropTypes.number.isRequired,
  grupoId: PropTypes.number.isRequired,
};
