import React, { useState } from 'react';
import router from 'next/router';
import { Grid } from '@mui/material';
import { ButtonsForm, Input, Select } from '@siiges-ui/shared';
import userRolOptions from '../utils/userRolOptions';

export default function NewUserForm() {
  const [userRol, setUserrol] = useState([]);
  const [form, setForm] = useState({ actualizado: 1, persona: {} });
  const [error, setError] = useState({});

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

  const handleOnBlur = (e) => {
    const { name } = e.target;
    if (name === 'nombre') {
      if (form.persona.nombre === undefined || form.persona.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
      } else {
        setError({ ...error, nombre: '' });
      }
    }
    if (name === 'apellidoPaterno') {
      if (
        form.persona.apellidoPaterno === undefined
        || form.persona.apellidoPaterno === ''
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
      } else {
        setError({ ...error, apellidoPaterno: '' });
      }
    }
    if (name === 'apellidoMaterno') {
      if (
        form.persona.apellidoMaterno === undefined
        || form.persona.apellidoMaterno === ''
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido materno invalido' });
      } else {
        setError({ ...error, apellidoMaterno: '' });
      }
    }
    if (name === 'tituloCargo') {
      if (form.tituloCargo === undefined || form.tituloCargo === '') {
        setError({ ...error, tituloCargo: 'Cargo invalido' });
      } else {
        setError({ ...error, tituloCargo: '' });
      }
    }
    if (name === 'correo') {
      if (form.correo === undefined || form.correo === '') {
        setError({ ...error, correo: 'Correo invalido' });
      } else {
        setError({ ...error, correo: '' });
      }
    }
    if (name === 'usuario') {
      if (form.usuario === undefined || form.usuario === '') {
        setError({ ...error, usuario: 'Usuario invalido' });
      } else {
        setError({ ...error, usuario: '' });
      }
    }
  };

  function submit() {
    if (Object.values(error).every((x) => x === null || x === '')) {
      fetch('http://localhost:3000/api/v1/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
  }

  userRolOptions(setUserrol);

  return (
    <Grid item sx={{ ml: 15 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input
            label="Nombre(s)"
            id="nombre"
            name="nombre"
            auto="nombre"
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
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.usuario}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Contraseña"
            id="contrasena"
            name="contrasena"
            auto="contrasena"
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Repetir contraseña"
            id="repeatContrasena"
            name="repeatContrasena"
            auto="repeatContrasena"
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <ButtonsForm cancel={() => router.back()} confirm={() => submit()} />
    </Grid>
  );
}
