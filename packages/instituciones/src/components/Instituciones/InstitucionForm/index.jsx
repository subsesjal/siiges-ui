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

export default function InstitucionForm({
  session, accion, institucion, setLoading, setTitle,
}) {
  const [errorFields, setErrorFields] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    setLoading(true);
    if (accion === 'crear' && session.id) {
      setForm({ usuarioId: session.id, tipoInstitucionId: 1, esNombreAutorizado: false });
      setTitle('Registrar Institución');
    }

    if (accion === 'editar' && session.id) {
      if (institucion.id) {
        setForm({ id: institucion.id });
        setTitle('Modificar Insitución');
      } else {
        router.back();
      }
    }
  }, []);

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
        />
        <Grid item xs={11} sx={{ marginTop: 5 }}>
          <ButtonsForm
            confirm={() => submitInstitucion({
              form,
              setForm,
              accion,
              errorFields,
            })}
            cancel={() => handleCancel()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

InstitucionForm.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
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
