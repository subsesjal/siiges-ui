import React, { useContext, useState, useEffect } from 'react';
import { Context } from '@siiges-ui/shared';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';

export default function UsuarioAvatar({ usuario }) {
  const { removeAuth, session } = useContext(Context);
  const { persona = undefined, rol = undefined } = usuario || {};
  const fullName = `${persona?.nombre} ${persona?.apellidoPaterno} ${persona?.apellidoMaterno}`;
  const [imageUrl, setImageUrl] = useState(null);
  const getProfilePhoto = async () => {
    try {
      const endpoint = '/files/';
      const query = `?tipoEntidad=PERSONA&entidadId=${session.id}&tipoDocumento=FOTOGRAFIA_PERSONA`;
      const response = await getData({ endpoint, query });
      if (response.statusCode === 200 && response.data) {
        let { url } = response.data;
        if (url) {
          if (!url.startsWith('http')) {
            url = `http://${url}`;
          }
          const response2 = await fetch(url);
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const blob = await response2.blob();
          const imageObjectUrl = URL.createObjectURL(blob);
          setImageUrl(imageObjectUrl);
        } else {
          setImageUrl(undefined);
        }
      } else {
        setImageUrl(undefined);
      }
    } catch (error) {
      setImageUrl(undefined);
    }
  };

  useEffect(() => {
    getProfilePhoto();
  }, [session]);

  return (
    <>
      {imageUrl ? (
        <Image
          alt="avatar"
          src={imageUrl}
          quality={100}
          width="300px"
          height="300px"
          style={{
            zIndex: 1,
            overflow: 'hidden',
          }}
        />
      ) : (
        <div
          style={{
            width: '300px',
            height: '300px',
            backgroundColor: '#ccc',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <span>Imagen no disponible</span>
        </div>
      )}

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
  usuario: PropTypes.shape({
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
    }),
    rol: PropTypes.shape({
      descripcion: PropTypes.string,
    }),
  }).isRequired,
};
