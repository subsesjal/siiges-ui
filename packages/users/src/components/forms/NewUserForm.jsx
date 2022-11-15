import React, { useState } from 'react';
import router from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonsForm, Input, Select,
} from '@siiges-ui/shared';
import {
  getFormData,
  getFormSelectData,
} from '@siiges-ui/shared/src/utils/forms/getFormData';
import userRolOptions from '../utils/userRolOptions';

export default function NewUserForm() {
  const [userRol, setUserrol] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    if (name === 'nombre') {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
      } else {
        setError({ ...error, nombre: '' });
      }
    }
    if (name === 'apellido_paterno') {
      if (form.apellido_paterno === undefined || form.apellido_paterno === '') {
        setError({ ...error, apellido_paterno: 'Apellido paterno invalido' });
      } else {
        setError({ ...error, apellido_paterno: '' });
      }
    }
    if (name === 'apellido_materno') {
      if (form.apellido_materno === undefined || form.apellido_materno === '') {
        setError({ ...error, apellido_materno: 'Apellido materno invalido' });
      } else {
        setError({ ...error, apellido_materno: '' });
      }
    }
    if (name === 'titulo_cargo') {
      if (form.titulo_cargo === undefined || form.titulo_cargo === '') {
        setError({ ...error, titulo_cargo: 'Cargo invalido' });
      } else {
        setError({ ...error, titulo_cargo: '' });
      }
    }
    if (name === 'correo') {
      if (form.correo === undefined || form.correo === '') {
        setError({ ...error, correo: 'Correo invalido' });
      } else {
        setError({ ...error, correo: '' });
      }
    }
  };

  function submit() {
    const dataInputs = getFormData('MuiOutlinedInput-input');
    const dataSelects = getFormSelectData('MuiSelect-nativeInput');
    const data = {
      ...dataInputs,
      ...dataSelects,
      actualizado: 1,
    };

    fetch('http://localhost:3000/api/v1/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
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
            id="apellido_paterno"
            name="apellido_paterno"
            auto="apellido_paterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.apellido_paterno}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Segundo Apellido"
            id="apellido_materno"
            name="apellido_materno"
            auto="apellido_materno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.apellido_materno}
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            title="Rol"
            options={userRol}
            name="rolId"
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            label="Cargo"
            id="titulo_cargo"
            name="titulo_cargo"
            auto="titulo_cargo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.titulo_cargo}
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
