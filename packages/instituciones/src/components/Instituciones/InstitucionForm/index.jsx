import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {
  Grid, IconButton, Typography, Tooltip,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
  ButtonsForm,
  SubmitDocument,
  DefaultModal,
  ButtonSimple,
  NavigationButtons,
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

const DOMAIN = process.env.NEXT_PUBLIC_URL;
const FALLBACK_IMAGE = '/logoschool.png';

export default function InstitucionForm({
  session,
  accion,
  institucion: initialInstitucion,
  setLoading,
  setTitle,
  setNoti,
}) {
  const [form, setForm] = useState({});
  const [institucion, setInstitucion] = useState(initialInstitucion || {});
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [confirmImageModal, setConfirmImageModal] = useState(false);
  const [openFinalModal, setOpenFinalModal] = useState(false);

  const fileInputRef = useRef(null);

  const getInstitutionPhoto = useCallback(async (institucionId) => {
    try {
      const response = await getData({
        endpoint: '/files/',
        query: `?tipoEntidad=INSTITUCION&entidadId=${institucionId}&tipoDocumento=LOGOTIPO`,
      });

      if (response.statusCode === 200 && response.data?.ubicacion) {
        setImageUrl(`${DOMAIN}${response.data.ubicacion}`);
      } else {
        setImageUrl(null);
      }
    } catch {
      setImageUrl(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      if (accion === 'crear') {
        setTitle('Registrar Institución');
        setForm({
          usuarioId: session.id,
          tipoInstitucionId: 1,
          esNombreAutorizado: false,
        });
      }

      if (accion === 'editar' && initialInstitucion?.id) {
        setTitle('Modificar Institución');
        setForm(initialInstitucion);
        setInstitucion(initialInstitucion);
        await getInstitutionPhoto(initialInstitucion.id);
      }

      setLoading(false);
    };

    init();
  }, [accion, initialInstitucion, session.id, getInstitutionPhoto, setLoading, setTitle]);

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append('archivoAdjunto', file);
    formData.append('tipoEntidad', 'INSTITUCION');
    formData.append('entidadId', institucion.id);
    formData.append('tipoDocumento', 'LOGOTIPO');

    try {
      setLoading(true);
      await SubmitDocument(formData);
      await getInstitutionPhoto(institucion.id);
    } catch (error) {
      setNoti({ open: true, message: 'Error al subir imagen', type: 'error' });
    } finally {
      setLoading(false);
      setConfirmImageModal(false);
      setFile(null);
    }
  };

  const handleConfirm = async () => {
    const success = await submitInstitucion({
      form,
      accion,
      errorFields: errors,
      setNoti,
      setLoading,
      institucion,
      setForm,
    });

    if (success && accion === 'crear') {
      setOpenFinalModal(true);
    }
  };

  const proxiedImage = imageUrl
    ? `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
    : FALLBACK_IMAGE;

  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', mt: 10 }}>
        <div style={{ position: 'relative', width: 300, height: 300 }}>
          <Image
            src={proxiedImage}
            alt="institucion-logo"
            width={300}
            height={300}
            quality={100}
            style={{ objectFit: 'contain' }}
            priority
          />

          {accion !== 'crear' && (
            <Tooltip title="Cambiar imagen">
              <IconButton
                onClick={() => fileInputRef.current.click()}
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
                size="small"
              >
                <PhotoCameraIcon />
              </IconButton>
            </Tooltip>
          )}

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setConfirmImageModal(true);
            }}
          />
        </div>
      </Grid>

      <Grid item xs={8}>
        <InstitucionFields
          handleOnChange={handleOnChange}
          handleOnBlur={handleOnBlur}
          institucion={institucion}
          errors={errors}
          setError={setErrors}
          setForm={setForm}
          form={form}
          setLoading={setLoading}
          accion={accion}
          page={page}
        />
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <ButtonsForm justifyContent="flex-start" confirm={handleConfirm} cancel={handleCancel} />
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
        open={confirmImageModal}
        setOpen={() => setConfirmImageModal(false)}
        title="Confirmar cambio de imagen"
      >
        <Typography>¿Deseas actualizar el logotipo?</Typography>
        <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <ButtonSimple text="Cancelar" onClick={() => setConfirmImageModal(false)} />
          </Grid>
          <Grid item>
            <ButtonSimple text="Confirmar" onClick={handleUploadImage} />
          </Grid>
        </Grid>
      </DefaultModal>

      <BiografiaBibliografiaModal
        open={openFinalModal}
        onClose={() => setOpenFinalModal(false)}
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
