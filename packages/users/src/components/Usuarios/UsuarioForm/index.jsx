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
  useApi,
} from '@siiges-ui/shared';
import {
  handleOnBlur,
  handleOnChange,
  handleRolOptions,
  submitUsuario,
} from '../../../utils/usuarioHandler';

export default function UsuarioForm({ session, accion, usuario }) {
  const [rolOptions, setRolOptions] = useState([{ id: '', nombre: '' }]);
  const [form, setForm] = useState({ actualizado: 1, persona: {} });
  const [endpoint, setEndpoint] = useState();
  const [method, setMethod] = useState('');
  const [err, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [schema, setSchema] = useState({});

  handleRolOptions(setRolOptions, session, useEffect);

  useEffect(() => {
    if (session.rol === 'admin') {
      setForm((prevForm) => ({ ...prevForm, estatus: 1 }));
    }

    if (usuario && accion === 'editar') {
      const { actualizado, ...usuarioData } = usuario;
      setForm(usuarioData);
    }

    if (endpoint) {
      setEndpoint(false);
    }
  }, []);

  const { error, data } = useApi({
    endpoint,
    method,
    dataBody: form,
    schema,
    setNoti,
  });

  useEffect(() => {
    if (error) {
      setNoti({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setNoti({
        open: true,
        message: 'Registro exitoso',
        type: 'success',
      });

      router.back();
    }
  }, [data]);

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
              value={usuario && usuario.persona
                ? usuario.persona.nombre
                : null}
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={err.nombre}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Primer Apellido"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              value={usuario && usuario.persona
                ? usuario.persona.apellidoPaterno
                : null}
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={err.apellidoPaterno}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Segundo Apellido"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              value={usuario && usuario.persona
                ? usuario.persona.apellidoMaterno
                : null}
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={err.apellidoMaterno}
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Rol"
              options={rolOptions || []}
              id="rolId"
              name="rolId"
              value={
                rolOptions.length > 1
                && usuario
                && usuario.rol
                  ? usuario.rol.id
                  : ''
}
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError, isRequired: true })}
              errorMessage={err.rolId}
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
              value={usuario && usuario.persona
                ? usuario.persona.tituloCargo
                : null}
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={err.tituloCargo}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo Electronico"
              id="correo"
              name="correo"
              auto="correo"
              value={usuario && usuario.correo
                ? usuario.correo
                : null}
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={err.correo}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              disabled={accion !== 'crear'}
              label="Usuario"
              id="usuario"
              name="usuario"
              auto="usuario"
              value={usuario && usuario.usuario
                ? usuario.usuario
                : null}
              required
              onchange={(e) => handleOnChange(e, { form, setForm })}
              onblur={(e) => handleOnBlur(e, { form, setError })}
              errorMessage={err.usuario}
            />
          </Grid>
          {
            (accion === 'crear')
            && (
            <>
              <Grid item xs={3}>
                <InputPassword
                  label="Contraseña"
                  id="contrasena"
                  name="contrasena"
                  auto="contrasena"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={err.contrasena}
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
                  errorMessage={err.repeatContrasena}
                />
              </Grid>
            </>
            )
          }
        </Grid>
        <ButtonsForm
          cancel={() => router.back()}
          confirm={() => submitUsuario({
            form,
            session,
            accion,
            setEndpoint,
            setForm,
            setMethod,
            setSchema,
            setNoti,
          })}
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
  usuario: PropTypes.shape({
    id: PropTypes.number,
    usuario: PropTypes.string,
    actualizado: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    correo: PropTypes.string,
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      tituloCargo: PropTypes.string,
    }),
    rol: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

UsuarioForm.defaultProps = {
  usuario: {} || undefined,
};
