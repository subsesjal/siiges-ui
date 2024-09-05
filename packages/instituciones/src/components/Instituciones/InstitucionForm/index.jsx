import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { ButtonsForm } from '@siiges-ui/shared';
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
      } else {
        router.back();
      }
    }
    setLoading(false);
  }, [accion, institucion.id, session.id, setLoading, setTitle]);

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
      setShowButtons(false); // Oculta los botones tras el éxito
      if (accion === 'crear') {
        setOpenModal(true); // Abre el modal para subir biografía y bibliografía
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
        <Image
          alt="logoschool"
          src="/logoschool.png"
          quality={100}
          width="300px"
          height="300px"
          style={{
            zIndex: 1,
            overflow: 'hidden',
          }}
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
