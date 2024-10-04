import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import {
  Context,
  SubmitDocument,
  DefaultModal,
  ButtonSimple,
} from '@siiges-ui/shared';
import { Typography, Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useRouter } from 'next/router';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';

export default function UsuarioAvatar({ usuario }) {
  const router = useRouter();
  const { session } = useContext(Context);
  const { persona = undefined, rol = undefined } = usuario || {};
  const fullName = `${persona?.nombre} ${persona?.apellidoPaterno} ${persona?.apellidoMaterno}`;
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);

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
            throw new Error('¡La respuesta de la red no fue correcta!');
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setOpenModal(true);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('archivoAdjunto', selectedFile);
    formData.append('tipoEntidad', 'PERSONA');
    formData.append('entidadId', session.id);
    formData.append('tipoDocumento', 'FOTOGRAFIA_PERSONA');
    try {
      await SubmitDocument(formData);
    } catch (error) {
      router.reload();
    } finally {
      setOpenModal(false);
      setSelectedFile(null);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div style={{ position: 'relative', width: '300px', height: '300px' }}>
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
              position: 'relative',
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
              position: 'relative',
            }}
          >
            <span>Imagen no disponible</span>
          </div>
        )}

        <IconButton
          onClick={() => fileInputRef.current.click()}
          sx={{
            position: 'absolute',
            top: '255px',
            right: '10px',
            zIndex: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
          size="small"
        >
          <PhotoCameraIcon />
        </IconButton>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

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

      <DefaultModal
        open={openModal}
        setOpen={handleModalClose}
        title="Confirmar cambio de imagen"
      >
        <Typography>¿Estás seguro de cambiar la imagen?</Typography>
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <ButtonSimple
              text="Cancelar"
              design="cancel"
              onClick={handleModalClose}
            />
          </Grid>
          <Grid item>
            <ButtonSimple
              text="Confirmar"
              onClick={handleUploadClick}
            />
          </Grid>
        </Grid>
      </DefaultModal>
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
