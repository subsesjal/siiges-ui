import React, {
  useContext, useState, useRef,
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

export default function UsuarioAvatar({ usuario }) {
  const { session, avatarUrl, refreshAvatar } = useContext(Context);
  const { persona = undefined, rol = undefined } = usuario || {};
  const fullName = `${persona?.nombre} ${persona?.apellidoPaterno} ${persona?.apellidoMaterno}`;
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);

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
      refreshAvatar();
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
        {avatarUrl ? (
          <Image
            alt="avatar"
            src={avatarUrl}
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
