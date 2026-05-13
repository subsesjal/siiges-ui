import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import {
  BinarySelect,
  ButtonsForm,
  Input,
  InputPassword,
  Select,
} from '@siiges-ui/shared';
import VIEW_STATE from '../../constants/viewState';
import ROLE_OPTIONS from '../../constants/roleOptions';

const STATUS_OPTIONS = [
  { id: 1, nombre: 'Activado' },
  { id: 0, nombre: 'Desactivado' },
];

export default function UserForm({
  mode,
  form,
  errors,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
  sessionRole,
}) {
  const isCreate = mode === VIEW_STATE.CREATE;
  const options = useMemo(() => {
    const roleOptions = ROLE_OPTIONS[sessionRole] || [{ id: '', nombre: '' }];
    if (!form.rolId) return roleOptions;

    const hasCurrentRole = roleOptions.some((option) => String(option.id) === String(form.rolId));
    if (hasCurrentRole) return roleOptions;

    return [...roleOptions, { id: String(form.rolId), nombre: 'Rol actual' }];
  }, [form.rolId, sessionRole]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {isCreate ? 'Crear usuario' : 'Editar usuario'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input
            label="Nombre(s)"
            id="nombre"
            name="nombre"
            auto="nombre"
            value={form.persona?.nombre || ''}
            required
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.nombre}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Primer Apellido"
            id="apellidoPaterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            value={form.persona?.apellidoPaterno || ''}
            required
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Segundo Apellido"
            id="apellidoMaterno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            value={form.persona?.apellidoMaterno || ''}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.apellidoMaterno}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            title="Rol"
            options={options}
            id="rolId"
            name="rolId"
            value={form.rolId || ''}
            required
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.rolId}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Cargo"
            id="tituloCargo"
            name="tituloCargo"
            auto="tituloCargo"
            value={form.persona?.tituloCargo || ''}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.tituloCargo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Correo Electronico"
            id="correo"
            name="correo"
            auto="correo"
            value={form.correo || ''}
            required
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.correo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            disabled={!isCreate}
            label="Usuario"
            id="usuario"
            name="usuario"
            auto="usuario"
            value={form.usuario || ''}
            required={isCreate}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.usuario}
          />
        </Grid>
        {isCreate ? (
          <Grid item xs={12} md={6}>
            <InputPassword
              label="Contrasena"
              id="contrasena"
              name="contrasena"
              auto="contrasena"
              required
              onChange={onChange}
              onblur={onBlur}
              errorMessage={errors.contrasena}
            />
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <BinarySelect
              title="Estatus del usuario"
              options={STATUS_OPTIONS}
              name="estatus"
              value={form.estatus ?? 1}
              onChange={onChange}
              required
            />
          </Grid>
        )}
        {isCreate && (
          <Grid item xs={12} md={6}>
            <InputPassword
              label="Repetir contrasena"
              id="repeatContrasena"
              name="repeatContrasena"
              auto="repeatContrasena"
              required
              onChange={onChange}
              onblur={onBlur}
              errorMessage={errors.repeatContrasena}
            />
          </Grid>
        )}
        {isCreate && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              La contrasena debe contener entre 8 y 25 caracteres, al menos una letra minuscula,
              una mayuscula, un digito y un simbolo.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <ButtonsForm
          cancel={onCancel}
          confirm={onSubmit}
        />
      </Box>
    </Box>
  );
}

UserForm.propTypes = {
  mode: PropTypes.string.isRequired,
  form: PropTypes.shape({
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      tituloCargo: PropTypes.string,
    }),
    rolId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    correo: PropTypes.string,
    usuario: PropTypes.string,
    estatus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  errors: PropTypes.shape({
    nombre: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    rolId: PropTypes.string,
    tituloCargo: PropTypes.string,
    correo: PropTypes.string,
    usuario: PropTypes.string,
    contrasena: PropTypes.string,
    repeatContrasena: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  sessionRole: PropTypes.string.isRequired,
};