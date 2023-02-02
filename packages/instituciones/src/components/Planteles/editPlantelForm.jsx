import React, { useState } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import { Grid, Typography } from '@mui/material';
import { ButtonsForm, Input, SnackAlert } from '@siiges-ui/shared';
import submitEditPlantel from '../utils/submitEditPlantel';

export default function EditPlantelForm({ plantel }) {
  const [form, setForm] = useState({ domicilio: {} });
  const [error, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === 'calle'
      || name === 'numeroExterior'
      || name === 'numeroInterior'
      || name === 'colonia'
      || name === 'codigoPostal'
      || name === 'claveCentroTrabajo'
    ) {
      setForm({ ...form, domicilio: { ...form.domicilio, [name]: value } });
    } else if (
      name === 'nombre'
      || name === 'apellidoMaterno'
      || name === 'apellidoPaterno'
      || name === 'nacionalidad'
      || name === 'curp'
      || name === 'sexo'
      || name === 'correoPrimario'
    ) {
      setForm({ ...form, directores: { ...form.directores, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const errors = {
    calle: () => {
      if (form.domicilio.calle === '') {
        setError({ ...error, calle: 'Calle invalida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: () => {
      if (form.domicilio.numeroExterior === '') {
        setError({ ...error, numeroExterior: 'Numero exterior invalido' });
        return false;
      }
      setError({ ...error, numeroExterior: '' });
      return true;
    },
    colonia: () => {
      if (form.domicilio.colonia === '') {
        setError({ ...error, colonia: 'Colonia invalida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: () => {
      if (form.domicilio.codigoPostal === '') {
        setError({ ...error, codigoPostal: 'Codigo postal invalido' });
        return false;
      }
      setError({ ...error, codigoPostal: '' });
      return true;
    },
    correo1: () => {
      if (form.correo1 === '') {
        setError({ ...error, correo1: 'Correo institucional invalido' });
        return false;
      }
      setError({ ...error, correo1: '' });
      return true;
    },
    correo2: () => {
      if (form.correo2 === '') {
        setError({ ...error, correo2: 'Correo de contacto invalido' });
        return false;
      }
      setError({ ...error, correo2: '' });
      return true;
    },
    correo3: () => {
      if (form.correo3 === '') {
        setError({ ...error, correo3: 'Correo secundario invalido' });
        return false;
      }
      setError({ ...error, correo3: '' });
      return true;
    },
    telefono1: () => {
      if (form.telefono1 === '') {
        setError({ ...error, telefono1: 'telefono 1 invalido' });
        return false;
      }
      setError({ ...error, telefono1: '' });
      return true;
    },
    telefono2: () => {
      if (form.telefono2 === '') {
        setError({ ...error, telefono2: 'telefono 2 invalido' });
        return false;
      }
      setError({ ...error, telefono2: '' });
      return true;
    },
    nombre: () => {
      if (form.director.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (form.director.apellidoPaterno === '') {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (form.director.apellidoMaterno === '') {
        setError({ ...error, apellidoMaterno: 'Apellido Materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nacionalidad: () => {
      if (form.director.nacionalidad === '') {
        setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    errors[name]();
  };

  const director = plantel.directores[0];

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
              label="Numero exterior"
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
              label="Numero interior"
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
              label="Codigo Postal"
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
              label="Telefono 1"
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
              label="Telefono 2"
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
              label="Telefono 3"
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
              label="Pagina Web"
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
              value={director.persona.nombre}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Paterno"
              id="directorLastName1"
              name="directorLastName1"
              auto="directorLastName1"
              required
              value={director.persona.apellidoPaterno}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Materno"
              id="directorLastName2"
              name="directorLastName2"
              auto="directorLastName2"
              required
              value={director.persona.apellidoMaterno}
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
              value={director.persona.nacionalidad}
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
              value={director.persona.curp}
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
              value={director.persona.sexo}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electronico"
              id="email"
              name="email"
              auto="email"
              required
              value={director.persona.correoPrimario}
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

EditPlantelForm.propTypes = {
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
