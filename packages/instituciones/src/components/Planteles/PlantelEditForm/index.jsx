import React, { useState } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import { Grid, Typography } from '@mui/material';
import { ButtonsForm, Input, SnackAlert } from '@siiges-ui/shared';
import submitEditPlantel from '../../utils/submitEditPlantel';
import plantelErrors from '../../utils/plantelErrors';
import formPlantel from '../../utils/formPlantel';

export default function PlantelEditForm({ plantel }) {
  const [form, setForm] = useState({ domicilio: {}, directores: {} });
  const [error, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPlantel(name, form, setForm, value);
  };

  const errors = plantelErrors(form, setError, error);

  const handleOnBlur = (e) => {
    const { name } = e.target;
    errors[name]();
  };

  const director = plantel.directores[0]?.persona;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Domicilio
      </Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label="Calle"
              id="calle"
              name="calle"
              auto="calle"
              value={plantel.domicilio.calle}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.calle}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Número exterior"
              id="numeroExterior"
              name="numeroExterior"
              auto="numeroExterior"
              value={plantel.domicilio.numeroExterior}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.numeroExterior}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Número interior"
              id="numeroInterior"
              name="numeroInterior"
              auto="numeroInterior"
              value={plantel.domicilio.numeroInterior}
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Colonia"
              id="colonia"
              name="colonia"
              auto="colonia"
              value={plantel.domicilio.colonia}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.colonia}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Código Postal"
              id="codigoPostal"
              name="codigoPostal"
              auto="codigoPostal"
              value={plantel.domicilio.codigoPostal}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.codigoPostal}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Municipio"
              id="municipio"
              name="municipio"
              auto="municipio"
              value={plantel.domicilio.municipio.nombre}
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Clave de centro de trabajo"
              id="claveCentroTrabajo"
              name="claveCentroTrabajo"
              auto="claveCentroTrabajo"
              value={plantel.domicilio.claveCentroTrabajo}
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos generales</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Correo institucional"
              id="correo1"
              name="correo1"
              auto="correo1"
              value={plantel.correo1}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.correo1}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo de contacto"
              id="correo2"
              name="correo2"
              auto="correo2"
              value={plantel.correo2}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.correo2}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo secundario"
              id="correo3"
              name="correo3"
              auto="correo3"
              value={plantel.correo3}
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Teléfono 1"
              id="telefono1"
              name="telefono1"
              auto="telefono1"
              value={plantel.telefono1}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.telefono1}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Teléfono 2"
              id="telefono2"
              name="telefono2"
              auto="telefono2"
              value={plantel.telefono2}
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.telefono2}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Teléfono 3"
              id="telefono3"
              name="telefono3"
              auto="telefono3"
              value={plantel.telefono3}
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Página Web"
              id="webSite"
              name="webSite"
              auto="webSite"
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Redes sociales"
              id="socialNetwork"
              name="socialNetwork"
              auto="socialNetwork"
              onchange={handleOnChange}
              class="data"
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos director</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label="Nombre(s)"
              id="directorName"
              name="directorName"
              auto="directorName"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              value={director?.nombre}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Primer Apellido"
              id="directorLastName1"
              name="directorLastName1"
              auto="directorLastName1"
              required
              value={director?.apellidoPaterno}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Segundo Apellido"
              id="directorLastName2"
              name="directorLastName2"
              auto="directorLastName2"
              required
              value={director?.apellidoMaterno}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Nacionalidad"
              id="nacionalidad"
              name="nacionalidad"
              auto="nacionalidad"
              required
              value={director?.nacionalidad}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="CURP"
              id="curp"
              name="curp"
              auto="curp"
              onchange={handleOnChange}
              value={director?.curp}
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Género"
              id="genero"
              name="genero"
              auto="genero"
              required
              value={director?.sexo}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electrónico"
              id="email"
              name="email"
              auto="email"
              required
              value={director?.correoPrimario}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
        </Grid>
        <ButtonsForm
          cancel={() => router.back()}
          confirm={() => submitEditPlantel(
            errors,
            error,
            form,
            setNoti,
            plantel.institucionId,
            plantel.id,
          )}
        />
      </Grid>
      <SnackAlert
        open={noti.open}
        close={() => {
          setNoti(false);
        }}
        type={noti.type}
        mensaje={noti.message}
      />
    </>
  );
}

PlantelEditForm.propTypes = {
  plantel: PropTypes.shape({
    domicilio: PropTypes.objectOf(PropTypes.string),
    institucionId: PropTypes.number,
    id: PropTypes.number,
    correo1: PropTypes.string,
    correo2: PropTypes.string,
    correo3: PropTypes.string,
    telefono1: PropTypes.string,
    telefono2: PropTypes.string,
    telefono3: PropTypes.string,
    claveCentroTrabajo: PropTypes.string,
    directores: PropTypes.arrayOf(
      PropTypes.shape({
        persona: PropTypes.shape({
          id: PropTypes.number,
          nombre: PropTypes.string,
          curp: PropTypes.string,
          apellidoPaterno: PropTypes.string,
          apellidoMaterno: PropTypes.string,
          sexo: PropTypes.string,
          nacionalidad: PropTypes.string,
          correoPrimario: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};
