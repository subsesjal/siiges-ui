import { Grid, TextField, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { formData } from '@siiges-ui/solicitudes/';
import errorDatosNewInstitucion from '../utils/errorDatosNewInstitucion';

export default function EditInstitutionForm({
  data, form, setForm, setErrors,
}) {
  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formData(name, value, form, setForm);
  };

  const errors = errorDatosNewInstitucion(form, setError, error);

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
              auto="nombreInstitucion"
              required
              class="data"
              onchange={handleOnChange}
              errorMessage={error.nombre}
              value={data.nombre}
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
              errorMessage={error.razonSocial}
              value={data.razonSocial}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="historiaInstitucion"
              label="Histroria de la institución"
              name="historia"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              value={data.historia}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="vision"
              label="Visión"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              value={data.vision}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mision"
              label="Misión"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              value={data.mision}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="valoresInstitucionales"
              label="Valores Institucionales"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              value={data.valoresInstitucional}
            />
          </Grid>
          <Grid item xs={8}>
            <InputFile label="Acta constitutiva de la institución" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Datos generales del rector</Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Nombre(s)"
              id="nombre"
              name="nombreRector"
              auto="nombre"
              required
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Paterno"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              onchange={handleOnChange}
              required
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Materno"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              onchange={handleOnChange}
              required
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Nacionalidad"
              id="nacionalidad"
              name="nacionalidad"
              auto="nacionalidad"
              onchange={handleOnChange}
              required
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="CURP"
              id="curp"
              name="curp"
              auto="curp"
              required
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Genero"
              id="genero"
              name="genero"
              auto="genero"
              required
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electronico"
              id="correo"
              name="correo"
              auto="correo"
              required
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

EditInstitutionForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucional: PropTypes.string,
  }).isRequired,
  form: PropTypes.objectOf(PropTypes.string).isRequired,
  setForm: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};
