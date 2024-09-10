import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import {
  Context, ButtonStyled, SubmitDocument, DefaultModal,
} from '@siiges-ui/shared';
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import { useRouter } from 'next/router';

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
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <ButtonStyled
              text="Cambiar Foto"
              alt="Cambiar Foto"
              onclick={() => fileInputRef.current.click()}
            >
              Cambiar imagen
            </ButtonStyled>
          </Grid>
        </Grid>
      </Paper>

      <DefaultModal
        open={openModal}
        setOpen={handleModalClose}
        title="Confirmar cambio de imagen"
      >
        <Typography>
          ¿Estás seguro de que quieres cambiar la imagen?
        </Typography>
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <ButtonStyled
              text="Cancelar"
              alt="Cancelar"
              onclick={handleModalClose}
            >
              Cancelar
            </ButtonStyled>
          </Grid>
          <Grid item>
            <ButtonStyled
              text="Confirmar"
              alt="Confirmar"
              onclick={handleUploadClick}
            >
              Confirmar
            </ButtonStyled>
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
