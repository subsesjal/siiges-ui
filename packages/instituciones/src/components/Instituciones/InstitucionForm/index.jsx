import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import { ButtonsForm, Context } from '@siiges-ui/shared';
import InstitucionFields from '../InstitucionFields';
import {
  submitInstitucion,
  handleCancel,
  handleOnChange,
  handleOnBlur,
} from '../../../utils/institucionHandler';

export default function InstitucionForm({ session, accion, institucion }) {
  const [form, setForm] = useState({});
  const [errorFields, setErrorFields] = useState({});
  const { setLoading, setNoti } = useContext(Context);

  useEffect(() => {
    if (accion === 'crear' && session.id) {
      setForm({ usuarioId: session.id, tipoInstitucionId: 1, esNombreAutorizado: false });
    }
  }, [session]);

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
        />
        <Grid item xs={11} sx={{ marginTop: 5 }}>
          <ButtonsForm
            confirm={() => submitInstitucion({
              form,
              setForm,
              accion,
              errorFields,
              setNoti,
              setLoading,
            })}
            cancel={() => handleCancel()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

InstitucionForm.propTypes = {
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
