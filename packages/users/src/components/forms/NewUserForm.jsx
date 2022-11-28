import React, { useState } from 'react';
import router from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonsForm,
  Input,
  InputPassword,
  Select,
  SnackAlert,
} from '@siiges-ui/shared';
import userRolOptions from '../utils/userRolOptions';
import submitNewUser from '../utils/submitNewUser';

export default function NewUserForm() {
  const [userRol, setUserrol] = useState([]);
  const [form, setForm] = useState({ actualizado: 1, persona: {} });
  const [error, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === 'nombre'
      || name === 'apellidoPaterno'
      || name === 'apellidoMaterno'
      || name === 'tituloCargo'
    ) {
      setForm({ ...form, persona: { ...form.persona, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const errors = {
    nombre: () => {
      if (form.persona.nombre === undefined || form.persona.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (
        form.persona.apellidoPaterno === undefined
        || form.persona.apellidoPaterno === ''
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (
        form.persona.apellidoMaterno === undefined
        || form.persona.apellidoMaterno === ''
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    tituloCargo: () => {
      if (
        form.persona.tituloCargo === undefined
        || form.persona.tituloCargo === ''
      ) {
        setError({ ...error, tituloCargo: 'Cargo invalido' });
        return false;
      }
      setError({ ...error, tituloCargo: '' });
      return true;
    },
    correo: () => {
      if (form.correo === undefined || form.correo === '') {
        setError({ ...error, correo: 'Correo invalido' });
        return false;
      }
      setError({ ...error, correo: '' });
      return true;
    },
    usuario: () => {
      if (form.usuario === undefined || form.usuario === '') {
        setError({ ...error, usuario: 'Usuario invalido' });
        return false;
      }
      setError({ ...error, usuario: '' });
      return true;
    },
    contrasena: () => {
      if (form.contrasena === undefined || form.contrasena === '') {
        setError({ ...error, contrasena: 'Contraseña invalida' });
        return false;
      }
      if (
        Object.keys(form.contrasena).length > 0
        && Object.keys(form.contrasena).length <= 4
      ) {
        setError({
          ...error,
          contrasena: 'La contraseña debe contener almenos 4 caracteres',
        });
        return false;
      }
      setError({ ...error, contrasena: '' });
      return true;
    },
    repeatContrasena: () => {
      if (
        form.repeatContrasena !== undefined
        && form.repeatContrasena !== form.contrasena
      ) {
        setError({
          ...error,
          repeatContrasena: 'Las contraseñas deben de ser iguales',
        });
        return false;
      }
      setError({ ...error, repeatContrasena: '' });
      return true;
    },
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    errors[name]();
  };

  userRolOptions(setUserrol);

  return (
    <>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Nombre(s)"
              id="nombre"
              name="nombre"
              auto="nombre"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.nombre}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Primer Apellido"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.apellidoPaterno}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Segundo Apellido"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.apellidoMaterno}
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Rol"
              options={userRol}
              id="rolId"
              name="rolId"
              onchange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label="Cargo"
              id="tituloCargo"
              name="tituloCargo"
              auto="tituloCargo"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tituloCargo}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo Electronico"
              id="correo"
              name="correo"
              auto="correo"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.correo}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Usuario"
              id="usuario"
              name="usuario"
              auto="usuario"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.usuario}
            />
          </Grid>
          <Grid item xs={3}>
            <InputPassword
              label="Contraseña"
              id="contrasena"
              name="contrasena"
              auto="contrasena"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.contrasena}
            />
          </Grid>
          <Grid item xs={3}>
            <InputPassword
              label="Repetir contraseña"
              id="repeatContrasena"
              name="repeatContrasena"
              auto="repeatContrasena"
              required
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.repeatContrasena}
            />
          </Grid>
        </Grid>
        <ButtonsForm
          cancel={() => router.back()}
          confirm={() => submitNewUser(errors, error, form, setNoti)}
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
