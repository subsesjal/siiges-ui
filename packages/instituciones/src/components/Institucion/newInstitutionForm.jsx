import { Grid, TextField } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { formData } from '@siiges-ui/solicitudes/';
import errorDatosNewInstitucion from '../utils/errorDatosNewInstitucion';

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
      <Grid item xs={8} sx={{ marginTop: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Input
              label="Nombre de institución"
              id="nombre"
              name="nombre"
              auto="nombre"
              required
              class="data"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.nombre}
            />
          </Grid>
          <Grid item xs={8}>
            <Input
              label="Razón social"
              id="razonSocial"
              name="razonSocial"
              auto="razonSocial"
              required
              class="data"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.razonSocial}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="historia"
              name="historia"
              label="Histroria de la institución"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              onFocus={handleInputFocus}
              errorMessage={error.historia}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="vision"
              name="vision"
              label="Visión"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              onFocus={handleInputFocus}
              errorMessage={error.vision}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mision"
              name="mision"
              label="Misión"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              onFocus={handleInputFocus}
              errorMessage={error.mision}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="valoresInstitucionles"
              name="valoresInstitucionles"
              label="Valores Institucionales"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              onFocus={handleInputFocus}
              errorMessage={error.valoresInstitucionles}
            />
          </Grid>
          {/* <Grid item xs={8}>
            <InputFile label="Acta constitutiva de la institución" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Datos generales del rector</Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Nombre(s)"
              id="nombre"
              name="nombre"
              auto="nombre"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Paterno"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Materno"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Nacionalidad"
              id="nacionalidad"
              name="nacionalidad"
              auto="nacionalidad"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="CURP"
              id="curp"
              name="curp"
              auto="curp"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Genero"
              id="genero"
              name="genero"
              auto="genero"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electronico"
              id="correo"
              name="correo"
              auto="correo"
              required
              class="data"
              onchae={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              errorMessage={error.programaTurnos}
            />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

NewInstitutionForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.string).isRequired,
};
