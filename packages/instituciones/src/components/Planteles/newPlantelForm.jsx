import React, { useContext, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  ButtonsForm, Context, Input, SnackAlert,
} from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import { useRouter } from 'next/router';
import getMunicipios from '../utils/getMunicipios';
import submitNewPlantel from '../utils/submitNewPlantel';

export default function NewPlantelForm() {
  const { session } = useContext(Context);
  const router = useRouter();
  const [form, setForm] = useState({
    domicilio: { estadoId: 14 },
    director: { persona: {} },
  });
  const [error, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const { municipios, loading } = getMunicipios();
  let options = [];
  if (loading !== false) {
    options = municipios.data.filter((municipio) => municipio.estadoId === 14);
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === 'calle'
      || name === 'numeroExterior'
      || name === 'numeroInterior'
      || name === 'colonia'
      || name === 'codigoPostal'
      || name === 'municipioId'
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
      setForm({
        ...form,
        director: {
          ...form.director,
          persona: { ...form.director.persona, [name]: value },
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^[0-9]+$/;

  const errors = {
    calle: () => {
      if (form.domicilio.calle === '' || form.domicilio.calle === undefined) {
        setError({ ...error, calle: 'Calle invalida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: () => {
      if (
        form.domicilio.numeroExterior === ''
        || form.domicilio.numeroExterior === undefined
      ) {
        setError({ ...error, numeroExterior: 'Numero exterior invalido' });
        return false;
      }
      setError({ ...error, numeroExterior: '' });
      return true;
    },
    colonia: () => {
      if (
        form.domicilio.colonia === ''
        || form.domicilio.colonia === undefined
      ) {
        setError({ ...error, colonia: 'Colonia invalida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: () => {
      if (
        form.domicilio.codigoPostal.match(validNumber)
        && form.domicilio.codigoPostal !== undefined
      ) {
        setError({ ...error, codigoPostal: '' });
        return true;
      }
      setError({ ...error, codigoPostal: 'Codigo postal invalido' });
      return false;
    },
    correo1: () => {
      if (form.correo1 !== undefined && form.correo1.match(validEmail)) {
        setError({ ...error, correo1: '' });
        return true;
      }
      setError({ ...error, correo1: 'Correo institucional invalido' });
      return false;
    },
    correo2: () => {
      if (form.correo2 !== undefined && form.correo2.match(validEmail)) {
        setError({ ...error, correo2: '' });
        return true;
      }
      setError({ ...error, correo2: 'Correo de contacto invalido' });
      return false;
    },
    municipio: () => {
      if (form.municipioId === undefined) {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: () => {
      if (form.tipoInmuebleId === undefined) {
        setError({ ...error, tipoInmuebleId: 'Seleccione un tipo de inmueble' });
        return false;
      }
      setError({ ...error, tipoInmuebleId: '' });
      return true;
    },
    telefono1: () => {
      if (form.telefono1.match(validNumber) && form.telefono1 !== undefined) {
        setError({ ...error, telefono1: '' });
        return true;
      }
      setError({ ...error, telefono1: 'telefono 1 invalido' });
      return false;
    },
    telefono2: () => {
      if (form.telefono2.match(validNumber) && form.telefono2 !== undefined) {
        setError({ ...error, telefono2: '' });
        return true;
      }
      setError({ ...error, telefono2: 'telefono 2 invalido' });
      return false;
    },
    nombre: () => {
      if (
        form.director.persona.nombre === ''
        || form.director.persona.nombre === undefined
      ) {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (
        form.director.persona.apellidoPaterno === ''
        || form.director.persona.apellidoPaterno === undefined
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (
        form.director.persona.apellidoMaterno === ''
        || form.director.persona.apellidoMaterno === undefined
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido Materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nacionalidad: () => {
      if (
        form.director.persona.nacionalidad === ''
        || form.director.persona.nacionalidad === undefined
      ) {
        setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
    sexo: () => {
      if (
        form.director.persona.sexo === ''
        || form.director.persona.sexo === undefined
      ) {
        setError({ ...error, sexo: 'Genero invalido' });
        return false;
      }
      setError({ ...error, sexo: '' });
      return true;
    },
    correoPrimario: () => {
      if (
        form.director.persona.correoPrimario !== undefined
        && form.director.persona.correoPrimario.match(validEmail)
      ) {
        setError({ ...error, correoPrimario: '' });
        return true;
      }
      setError({ ...error, correoPrimario: 'Correo invalido' });
      return false;
    },
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    errors[name]();
  };

  const inmuebles = [
    { id: 1, nombre: 'Construido' },
    { id: 2, nombre: 'Adaptado' },
    { id: 3, nombre: 'Mixto' },
  ];

  const sexo = [
    { id: 'masculino', nombre: 'Masculino' },
    { id: 'femenino', nombre: 'Femenino' },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ mt: 5 }}>
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
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.calle}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Numero exterior"
              id="numeroExterior"
              name="numeroExterior"
              auto="numeroExterior"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.numeroExterior}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Numero interior"
              id="numeroInterior"
              name="numeroInterior"
              auto="numeroInterior"
              onchange={handleOnChange}
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
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.colonia}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Codigo Postal"
              id="codigoPostal"
              name="codigoPostal"
              auto="codigoPostal"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.codigoPostal}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Municipio"
              options={options}
              name="municipioId"
              onchange={handleOnChange}
              errorMessage={error.municipio}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Tipo Inmueble"
              options={inmuebles}
              name="tipoInmuebleId"
              onchange={handleOnChange}
              errorMessage={error.tipoInmuebleId}
              required
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
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.correo1}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo de contacto"
              id="correo2"
              name="correo2"
              auto="correo2"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.correo2}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo secundario"
              id="correo3"
              name="correo3"
              auto="correo3"
              onchange={handleOnChange}
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
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.telefono1}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Telefono 2"
              id="telefono2"
              name="telefono2"
              auto="telefono2"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.telefono2}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Telefono 3"
              id="telefono3"
              name="telefono3"
              auto="telefono3"
              onchange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Clave de centro de trabajo"
              id="claveCentroTrabajo"
              name="claveCentroTrabajo"
              auto="claveCentroTrabajo"
              onchange={handleOnChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Pagina Web"
              id="webSite"
              name="webSite"
              auto="webSite"
              onchange={handleOnChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Redes sociales"
              id="socialNetwork"
              name="socialNetwork"
              auto="socialNetwork"
              onchange={handleOnChange}
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
              id="nombre"
              name="nombre"
              auto="nombre"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Paterno"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.apellidoPaterno}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Materno"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.apellidoMaterno}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Nacionalidad"
              id="nacionalidad"
              name="nacionalidad"
              auto="nacionalidad"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nacionalidad}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Curp"
              id="curp"
              name="curp"
              auto="curp"
              onchange={handleOnChange}
            />
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Genero"
              options={sexo}
              onchange={handleOnChange}
              name="sexo"
              errorMessage={error.sexo}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electronico"
              id="correoPrimario"
              name="correoPrimario"
              auto="correoPrimario"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.correoPrimario}
              required
            />
          </Grid>
        </Grid>
        <ButtonsForm
          cancel={router.back}
          confirm={() => submitNewPlantel(errors, error, form, setNoti, session.id)}
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
