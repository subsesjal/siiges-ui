import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import { getUserDisplayName } from '../../utils/userForm';

export default function UserDetails({ user }) {
  const persona = user?.persona || {};
  const rol = user?.rol || {};

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Informacion del usuario</Typography>
      <Stack spacing={1} sx={{ marginTop: 2 }}>
        <Typography variant="body2">Nombre: {getUserDisplayName(user) || '-'}</Typography>
        <Typography variant="body2">Correo: {user?.correo || '-'}</Typography>
        <Typography variant="body2">Usuario: {user?.usuario || '-'}</Typography>
        <Typography variant="body2">Rol: {rol.descripcion || rol.nombre || '-'}</Typography>
        <Typography variant="body2">Cargo: {persona.tituloCargo || '-'}</Typography>
        <Typography variant="body2">Estatus: {user?.estatus === 1 ? 'Activado' : 'Desactivado'}</Typography>
      </Stack>
    </Box>
  );
}

UserDetails.propTypes = {
  user: PropTypes.shape({
    correo: PropTypes.string,
    usuario: PropTypes.string,
    estatus: PropTypes.number,
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      tituloCargo: PropTypes.string,
    }),
    rol: PropTypes.shape({
      nombre: PropTypes.string,
      descripcion: PropTypes.string,
    }),
  }).isRequired,
};