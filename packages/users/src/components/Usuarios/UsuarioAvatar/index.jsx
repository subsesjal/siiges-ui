import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export default function UsuarioAvatar({ usuario }) {
  const { persona = undefined, rol = undefined } = usuario || {};
  const fullName = `${persona?.nombre} ${persona?.apellidoPaterno} ${persona?.apellidoMaterno}`;
  return (
    <>
      <Image
        alt="avatar"
        src="/avatar.png"
        quality={100}
        width="300px"
        height="300px"
        style={{
          zIndex: 1,
          overflow: 'hidden',
        }}
      />
      <Paper
        sx={{
          padding: 2,
          marginTop: 3,
          width: 300,
          textAlign: 'center',
        }}
      >
        <Typography variant="p">{fullName}</Typography>
        <br />
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="p">{rol?.descripcion}</Typography>
      </Paper>
    </>
  );
}

UsuarioAvatar.propTypes = {
  usuario: PropTypes.objectOf.isRequired,
};
