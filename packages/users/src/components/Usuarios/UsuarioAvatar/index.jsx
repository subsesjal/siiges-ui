import Tooltip from '@mui/material/Tooltip';
import React, { useState, useRef } from 'react';
import {
  SubmitDocument, DefaultModal, ButtonSimple, useAuth, useUser,
} from '@siiges-ui/shared';
import { Typography, Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const AVATAR_SIZE = 220;
const DEFAULT_AVATAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"><circle cx="110" cy="110" r="110" fill="#E5E7EB"/><circle cx="110" cy="85" r="42" fill="#9CA3AF"/><path d="M35 197c15-36 43-55 75-55s60 19 75 55" fill="#9CA3AF"/></svg>',
)}`;

export default function UsuarioAvatar({ usuario }) {
  const { session } = useAuth();
  const { avatarUrl, refreshAvatar } = useUser();

  const { persona = undefined, rol = undefined } = usuario || {};
  const fullName = `${persona?.nombre} ${persona?.apellidoPaterno} ${persona?.apellidoMaterno}`;
  const avatarSrc = avatarUrl || DEFAULT_AVATAR_SVG;
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAvatarClick();
    }
  };

  return (
    <>
      <Tooltip title="Agregar Imagen" placement="top">
        <div
          role="button"
          tabIndex={0}
          aria-label="Agregar Imagen"
          onClick={handleAvatarClick}
          onKeyDown={handleAvatarKeyDown}
          style={{
            position: 'relative',
            width: `${AVATAR_SIZE}px`,
            height: `${AVATAR_SIZE}px`,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1px solid #E5E7EB',
            cursor: 'pointer',
          }}
        >
          {avatarUrl ? (
            <Image
              alt="avatar"
              src={avatarUrl}
              quality={100}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              style={{
                zIndex: 1,
                objectFit: 'cover',
              }}
            />
          ) : (
            <img
              alt="avatar"
              src={avatarSrc}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              style={{
                zIndex: 1,
                objectFit: 'cover',
                width: `${AVATAR_SIZE}px`,
                height: `${AVATAR_SIZE}px`,
                display: 'block',
              }}
            />
          )}
          <IconButton
            onClick={handleAvatarClick}
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
            size="small"
          >
            <PhotoCameraIcon />
          </IconButton>
        </div>
      </Tooltip>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />

      <Paper
        sx={{
          padding: 2,
          marginTop: 3,
          width: AVATAR_SIZE,
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
