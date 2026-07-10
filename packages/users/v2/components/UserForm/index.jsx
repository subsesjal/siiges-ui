import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Grid, Stack, Typography,
} from '@mui/material';
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

const MODE_TITLES = {
  [VIEW_STATE.CREATE]: 'Datos del usuario',
  [VIEW_STATE.VIEW]: 'Datos del usuario',
  [VIEW_STATE.EDIT]: 'Datos del usuario',
};

export default function UserForm({
  mode,
  form,
  errors,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
  sessionRole,
  topAction,
}) {
  const isCreate = mode === VIEW_STATE.CREATE;
  const isEdit = mode === VIEW_STATE.EDIT;
  const isView = mode === VIEW_STATE.VIEW;
  const title = MODE_TITLES[mode] || 'Formulario de usuario';

  const options = useMemo(() => {
    const roleOptions = ROLE_OPTIONS[sessionRole] || [{ id: '', nombre: '' }];
    if (!form.rolId) return roleOptions;

    const hasCurrentRole = roleOptions.some((option) => String(option.id) === String(form.rolId));
    if (hasCurrentRole) return roleOptions;

    return [...roleOptions, { id: String(form.rolId), nombre: 'Rol actual' }];
  }, [form.rolId, sessionRole]);

  let footerAction = null;
  if (isView) {
    footerAction = (
      <ButtonsForm
        cancel={onCancel}
        confirm={onSubmit}
        confirmDisabled
        cancelText="Regresar"
      />
    );
  } else {
    footerAction = (
      <ButtonsForm
        cancel={onCancel}
        confirm={onSubmit}
      />
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Typography variant="h6">
          {title}
        </Typography>
        {topAction}
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Input
            label="Nombre(s)"
            id="nombre"
            name="nombre"
            auto="nombre"
            value={form.persona?.nombre || ''}
            required
            disabled={isView}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.nombre}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Input
            label="Primer Apellido"
            id="apellidoPaterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            value={form.persona?.apellidoPaterno || ''}
            required
            disabled={isView}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Input
            label="Segundo Apellido"
            id="apellidoMaterno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            value={form.persona?.apellidoMaterno || ''}
            disabled={isView}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.apellidoMaterno}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            title="Rol"
            options={options}
            id="rolId"
            name="rolId"
            value={form.rolId || ''}
            required
            disabled={!isCreate}
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
            disabled={isView}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.tituloCargo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Correo Electrónico"
            id="correo"
            name="correo"
            auto="correo"
            value={form.correo || ''}
            required
            disabled={isView}
            onChange={onChange}
            onblur={onBlur}
            errorMessage={errors.correo}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Input
            disabled={!isCreate || isView}
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
        <Grid item xs={12} md={3}>
          <BinarySelect
            title="Estatus del usuario"
            options={STATUS_OPTIONS}
            name="estatus"
            value={form.estatus ?? 1}
            onChange={onChange}
            disabled={isView || isEdit}
            required
          />
        </Grid>
        {isCreate && (
          <Grid item xs={12} md={3}>
            <InputPassword
              label="Contraseña"
              id="contrasena"
              name="contrasena"
              auto="contrasena"
              required
              onChange={onChange}
              onblur={onBlur}
              errorMessage={errors.contrasena}
            />
          </Grid>
        )}
        {isCreate && (
          <Grid item xs={12} md={3}>
            <InputPassword
              label="Repetir contraseña"
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
              La contraseña debe contener entre 8 y 25 caracteres, al menos una letra minuscula,
              una mayuscula, un digito y un simbolo.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        {footerAction}
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
  topAction: PropTypes.node,
};

UserForm.defaultProps = {
  topAction: null,
};
