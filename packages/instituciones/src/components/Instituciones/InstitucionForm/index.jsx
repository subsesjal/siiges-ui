import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import Image from 'next/image';
import { Grid, IconButton, Typography } from '@mui/material';
import {
  ButtonsForm,
  SubmitDocument,
  DefaultModal,
  ButtonSimple,
  NavigationButtons,
} from '@siiges-ui/shared';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InstitucionFields from '../InstitucionFields';
import {
  submitInstitucion,
  handleCancel,
  handleOnChange,
  handleOnBlur,
} from '../../../utils/institucionHandler';
import BiografiaBibliografiaModal from '../../utils/BiografiaBibliografiaModal';

export default function InstitucionForm({
  session,
  accion,
  institucion,
  setLoading,
  setTitle,
  setNoti,
}) {
  const [errorFields, setErrorFields] = useState({});
  const [form, setForm] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [openModalPhoto, setOpenModalPhoto] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

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

    if (success && accion === 'crear') {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    setConfirmDisabled(page <= 1);
  }, [page]);

  const getInstitutionPhoto = async (institucionId) => {
    try {
      const endpoint = '/files/';
      const query = `?tipoEntidad=INSTITUCION&entidadId=${institucionId}&tipoDocumento=LOGOTIPO`;
      const response = await getData({ endpoint, query });
      if (response.statusCode === 200 && response.data?.url) {
        let { url } = response.data;
        if (!url.startsWith('http')) {
          url = `http://${url}`;
        }
        const imageBlob = await fetch(url).then((res) => res.blob());
        setImageUrl(URL.createObjectURL(imageBlob));
      } else {
        setImageUrl(null); // Fallback to default
      }
    } catch (error) {
      setImageUrl(null); // Fallback on error
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
    const initializeForm = async () => {
      setLoading(true);
      if (accion === 'crear' && session.id) {
        setForm({
          usuarioId: session.id,
          tipoInstitucionId: 1,
          esNombreAutorizado: false,
        });
        setTitle('Registrar Institución');
      } else if (accion === 'editar' && institucion.id) {
        setForm({ id: institucion.id });
        setTitle('Modificar Institución');
        await getInstitutionPhoto(institucion.id);
      } else {
        router.back();
      }
      setLoading(false);
    };

    initializeForm();
  }, [accion, institucion.id, session.id, setLoading, setTitle]);

  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <Image
            alt="institucion-logo"
            src={imageUrl || '/logoschool.png'}
            quality={100}
            width="300px"
            height="300px"
            style={{ zIndex: 1, overflow: 'hidden' }}
          />
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
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <ButtonsForm
          confirm={handleConfirm}
          confirmDisabled={confirmDisabled}
          cancel={handleCancel}
          justifyContent="flex-start"
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <NavigationButtons
          currentPosition={page}
          totalPositions={2}
          onNext={() => setPage(2)}
          onPrevious={() => setPage(1)}
        />
      </Grid>
      <DefaultModal
        open={openModalPhoto}
        setOpen={handleModalClose}
        title="Confirmar cambio de imagen"
      >
        <Typography>¿Estás seguro de cambiar la imagen?</Typography>
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <ButtonSimple
              text="Cancelar"
              alt="Cancelar"
              onClick={handleModalClose}
            />
          </Grid>
          <Grid item>
            <ButtonSimple
              text="Confirmar"
              alt="Confirmar"
              onClick={handleUploadClick} // Fixed typo
            />
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
