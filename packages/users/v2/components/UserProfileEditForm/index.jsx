import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  BinarySelect,
  ButtonsForm,
  Input,
  Select,
} from '@siiges-ui/shared';
import ROLE_OPTIONS from '../../constants/roleOptions';

const STATUS_OPTIONS = [
  { id: 1, nombre: 'Activado' },
  { id: 0, nombre: 'Desactivado' },
];

const GENERO_OPTIONS = [
  { id: 'Masculino', nombre: 'Masculino' },
  { id: 'Femenino', nombre: 'Femenino' },
  { id: 'Prefiero no decirlo', nombre: 'Prefiero no decirlo' },
];

const NACIONALIDAD_OPTIONS = [
  { id: 'Mexicana', nombre: 'Mexicana' },
  { id: 'Otro', nombre: 'Otro' },
];

const getCatalogValue = (options, currentValue) => {
  if (currentValue === undefined || currentValue === null || currentValue === '') {
    return '';
  }

  const normalized = String(currentValue).trim();
  const match = options.find((option) => option.nombre === normalized);
  return match ? match.id : '';
};

export default function UserProfileEditForm({
  form,
  errors,
  sessionRole,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}) {
  const handleCatalogChange = (event) => {
    const { name, value } = event.target;

    onChange({
      target: {
        name,
        value: value || '',
      },
    });
  };

  const roleOptions = useMemo(() => {
    const options = ROLE_OPTIONS[sessionRole] || [{ id: '', nombre: '' }];
    if (!form.rolId) {
      return options;
    }

    const hasCurrentRole = options.some((option) => String(option.id) === String(form.rolId));
    if (hasCurrentRole) {
      return options;
    }

    return [...options, { id: String(form.rolId), nombre: 'Rol actual' }];
  }, [form.rolId, sessionRole]);

  return (
    <Stack spacing={3} sx={{ paddingTop: 1 }}>
      <Box sx={{ padding: 1 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Datos de contacto</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Input
                label="Nombre"
                id="nombre"
                name="nombre"
                value={form.persona?.nombre || ''}
                required
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.nombre}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="Primer apellido"
                id="apellidoPaterno"
                name="apellidoPaterno"
                value={form.persona?.apellidoPaterno || ''}
                required
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.apellidoPaterno}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="Segundo apellido"
                id="apellidoMaterno"
                name="apellidoMaterno"
                value={form.persona?.apellidoMaterno || ''}
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.apellidoMaterno}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                title="Género"
                id="sexo"
                name="sexo"
                value={getCatalogValue(GENERO_OPTIONS, form.persona?.sexo)}
                options={GENERO_OPTIONS}
                onChange={handleCatalogChange}
                onblur={onBlur}
                errorMessage={errors.sexo}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                title="Nacionalidad"
                id="nacionalidad"
                name="nacionalidad"
                value={getCatalogValue(NACIONALIDAD_OPTIONS, form.persona?.nacionalidad)}
                options={NACIONALIDAD_OPTIONS}
                onChange={handleCatalogChange}
                onblur={onBlur}
                errorMessage={errors.nacionalidad}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="RFC"
                id="rfc"
                name="rfc"
                value={form.persona?.rfc || ''}
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.rfc}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="CURP"
                id="curp"
                name="curp"
                value={form.persona?.curp || ''}
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.curp}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="Correo electrónico"
                id="correo"
                name="correo"
                value={form.correo || ''}
                required
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.correo}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="Celular"
                id="celular"
                name="celular"
                value={form.persona?.celular || ''}
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.celular}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="Teléfono"
                id="telefono"
                name="telefono"
                value={form.persona?.telefono || ''}
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.telefono}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Box sx={{ padding: 1 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Datos del usuario</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Input
                label="Usuario"
                id="usuario"
                name="usuario"
                value={form.usuario || ''}
                disabled
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.usuario}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                title="Rol"
                id="rolId"
                name="rolId"
                value={form.rolId || ''}
                options={roleOptions}
                disabled
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.rolId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Input
                label="Cargo"
                id="tituloCargo"
                name="tituloCargo"
                value={form.persona?.tituloCargo || ''}
                onChange={onChange}
                onblur={onBlur}
                errorMessage={errors.tituloCargo}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <BinarySelect
                title="Estatus del usuario"
                name="estatus"
                value={form.estatus ?? 1}
                options={STATUS_OPTIONS}
                onChange={onChange}
                disabled
                required
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Box>
        <ButtonsForm cancel={onCancel} confirm={onSubmit} />
      </Box>
    </Stack>
  );
}

UserProfileEditForm.propTypes = {
  form: PropTypes.shape({
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      sexo: PropTypes.string,
      nacionalidad: PropTypes.string,
      rfc: PropTypes.string,
      curp: PropTypes.string,
      celular: PropTypes.string,
      telefono: PropTypes.string,
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
    sexo: PropTypes.string,
    nacionalidad: PropTypes.string,
    rfc: PropTypes.string,
    curp: PropTypes.string,
    correo: PropTypes.string,
    celular: PropTypes.string,
    telefono: PropTypes.string,
    usuario: PropTypes.string,
    rolId: PropTypes.string,
    tituloCargo: PropTypes.string,
    estatus: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  sessionRole: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
