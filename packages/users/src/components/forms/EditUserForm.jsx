import React, { useContext, useState } from 'react';
import router from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonsForm, Context, Input, Select,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getFormData,
  getFormSelectData,
} from '@siiges-ui/shared/src/utils/forms/getFormData';
import userRolOptions from '../utils/userRolOptions';

export default function EditUserForm({ user }) {
  const { persona, rol } = user.data;
  const { session } = useContext(Context);
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
    if (name === 'cargo') {
      if (form.cargo === undefined || form.cargo === '') {
        setError({ ...error, cargo: 'Cargo invalido' });
      } else {
        setError({ ...error, cargo: '' });
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
    };

    fetch(`http://localhost:3000/api/v1/usuarios/${session.id}`, {
      method: 'PATCH',
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
            value={persona.nombre}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.nombre}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Primer Apellido"
            id="apellido_paterno"
            name="apellido_paterno"
            auto="apellido_paterno"
            value={persona.apellidoPaterno}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.apellido_paterno}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Segundo Apellido"
            id="apellido_materno"
            name="apellido_materno"
            auto="apellido_materno"
            value={persona.apellidoMaterno}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.apellido_materno}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            title="Rol"
            options={userRol}
            value={rol.id}
            name="rol_id"
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            label="Cargo"
            id="cargo"
            name="cargo"
            auto="cargo"
            value="cargo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.cargo}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo Electronico"
            id="correo"
            name="correo"
            auto="correo"
            value={user.data.correo}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.correo}
            class="data"
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
            value={user.data.usuario}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Contraseña"
            id="contrasena"
            name="contrasena"
            auto="contrasena"
            value={user.data.contrasena}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Repetir contraseña"
            id="repeatContrasena"
            name="repeatContrasena"
            auto="repeatContrasena"
            value={user.data.contrasena}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
      </Grid>
      <ButtonsForm cancel={() => router.back()} confirm={() => submit()} />
    </Grid>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.objectOf.isRequired,
};
