import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { formData } from '@siiges-ui/solicitudes/';
import errorDatosNewInstitucion from '../utils/errorDatosNewInstitucion';
import InstitucionFields from './InstitucionFields';

export default function NewInstitutionForm({ form, setForm, setErrors }) {
  const [initialValues, setInitialValues] = useState({});
  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formData(name, value, form, setForm);
  };

  const errors = errorDatosNewInstitucion(form, setError, error);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];
    if (value !== initialValue || value === '') {
      errors[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errors !== undefined) {
      setErrors(errors);
    }
  }, [error]);

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
          handleInputFocus={handleInputFocus}
          error={error}
        />
      </Grid>
    </Grid>
  );
}

NewInstitutionForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.string).isRequired,
};
