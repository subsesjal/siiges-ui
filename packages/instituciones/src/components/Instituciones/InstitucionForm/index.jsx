import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import Image from 'next/image';
import {
  Grid, Typography,
} from '@mui/material';
import {
  ButtonStyled, ButtonsForm, SubmitDocument, DefaultModal,
} from '@siiges-ui/shared';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import InstitucionFields from '../InstitucionFields';
import {
  submitInstitucion,
  handleCancel,
  handleOnChange,
  handleOnBlur,
} from '../../../utils/institucionHandler';
import BiografiaBibliografiaModal from '../../utils/BiografiaBibliografiaModal';

export default function InstitucionForm({
  session, accion, institucion, setLoading, setTitle, setNoti,
}) {
  const [errorFields, setErrorFields] = useState({});
  const [form, setForm] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [openModalPhoto, setOpenModalPhoto] = useState(false);

  const handleConfirm = async () => {
    const success = await submitInstitucion({
      form,
      accion,
      errorFields,
      setNoti,
      setLoading,
      institucion,
      setForm,
    });

    if (success) {
      setShowButtons(false);
      if (accion === 'crear') {
        setOpenModal(true);
      }
    }
  };
  const getInstitutionPhoto = async (institucionId) => {
    try {
      const endpoint = '/files/';
      const query = `?tipoEntidad=INSTITUCION&entidadId=${institucionId}&tipoDocumento=LOGOTIPO`;
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
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setOpenModalPhoto(true);
  };

  const handleUploadClick = async () => {
    const formData = new FormData();
    formData.append('archivoAdjunto', selectedFile);
    formData.append('tipoEntidad', 'INSTITUCION');
    formData.append('entidadId', institucion.id);
    formData.append('tipoDocumento', 'LOGOTIPO');
    try {
      await SubmitDocument(formData);
    } catch (error) {
      router.reload();
    } finally {
      setOpenModalPhoto(false);
      setSelectedFile(null);
    }
  };

  const handleModalClose = () => {
    setOpenModalPhoto(false);
  };
  useEffect(() => {
    setLoading(true);
    if (accion === 'crear' && session.id) {
      setForm({ usuarioId: session.id, tipoInstitucionId: 1, esNombreAutorizado: false });
      setTitle('Registrar Institución');
    }

    if (accion === 'editar' && session.id) {
      if (institucion.id) {
        setForm({ id: institucion.id });
        setTitle('Modificar Institución');
        getInstitutionPhoto(institucion.id);
      } else {
        router.back();
      }
    }
    setLoading(false);
  }, [accion, institucion.id, session.id, setLoading, setTitle]);
  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
        <Image
          alt="institucion-logo"
          src={imageUrl || '/logoschool.png'}
          quality={100}
          width="300px"
          height="300px"
          style={{
            zIndex: 1,
            overflow: 'hidden',
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Grid>
      <Grid item xs={8}>
        <InstitucionFields
          handleOnChange={handleOnChange}
          handleOnBlur={handleOnBlur}
          institucion={institucion}
          errors={errorFields}
          setError={setErrorFields}
          setForm={setForm}
          form={form}
          setLoading={setLoading}
          accion={accion}
          page={page}
          setPage={setPage}
        />
        {showButtons && page === 2 && (
          <Grid item xs={11} sx={{ marginTop: 5 }}>
            <ButtonsForm
              confirm={handleConfirm}
              cancel={() => handleCancel()}
            />
          </Grid>
        )}
      </Grid>
      <DefaultModal
        open={openModalPhoto}
        setOpen={handleModalClose}
        title="Confirmar cambio de imagen"
      >
        <Typography>
          ¿Estás seguro de cambiar la imagen?
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
      <BiografiaBibliografiaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        institucionId={form.id}
        setNoti={setNoti}
        setLoading={setLoading}
      />
    </Grid>
  );
}

InstitucionForm.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setNoti: PropTypes.func.isRequired,
  accion: PropTypes.string.isRequired,
  institucion: PropTypes.shape({
    id: PropTypes.number,
    planteles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
  }),
  session: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    rol: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};

InstitucionForm.defaultProps = {
  institucion: null,
};
