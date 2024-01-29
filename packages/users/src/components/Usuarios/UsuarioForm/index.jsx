import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonsForm,
  Input,
  InputPassword,
  SnackAlert,
  Select,
  submitData,
} from '@siiges-ui/shared';
import { createUsuarioSchema } from '../../../schemas/createUsuario.schema';
import { handleOnBlur, handleOnChange, handleRolOptions } from '../../../utils/usuarioHandler';

export default function UsuarioForm({ session, accion, usuarioId }) {
  const [rolOptions, setRolOptions] = useState([{ id: '', nombre: '' }]);
  const [form, setForm] = useState({ actualizado: 1, persona: {} });
  const [error, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [path, setPath] = useState('/');
  handleRolOptions(setRolOptions, session, useEffect);

  useEffect(() => {
    // Update estatus to 1 when rol is 'admin'
    if (session.rol === 'admin') {
      setForm((prevForm) => ({ ...prevForm, estatus: 1 }));
    }
    if (accion === 'crear') {
      if (session.rol === 'representante') {
        setPath(`/usuarios/${session.id}/usuario`);
      }

      if (session.rol === 'admin') {
        setPath('/usuarios');
      }
    }

    if (accion === 'editar') {
      if (session.rol === 'representante') {
        setPath(`/usuarios/${session.id}/usuario/${usuarioId}`);
      }

      if (session.rol === 'admin') {
        setPath(`/usuarios/${usuarioId}`);
      }
    }
  }, [session.rol]);

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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={error.apellidoMaterno}
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Rol"
              options={rolOptions || []}
              id="rolId"
              name="rolId"
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError, isRequired: true })}
              errorMessage={error.rolId}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
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
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={error.repeatContrasena}
            />
          </Grid>
        </Grid>
        <ButtonsForm
          cancel={() => router.back()}
          confirm={() => submitData(
            form,
            createUsuarioSchema,
            path,
            setNoti,
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

UsuarioForm.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  accion: PropTypes.string.isRequired,
  usuarioId: PropTypes.string,
};

UsuarioForm.defaultProps = {
  usuarioId: null,
};
