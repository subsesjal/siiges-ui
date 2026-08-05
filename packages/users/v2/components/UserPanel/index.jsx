import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import VIEW_STATE from '../../constants/viewState';
import UserForm from '../UserForm';
import useUserForm from '../../hooks/useUserForm';
import UsersSkeleton from '../UsersSkeleton';
import { buildChangedUpdatePayload } from '../../utils/userForm';

const BASE_VISIBLE_FIELDS = [
  'nombre',
  'apellidoPaterno',
  'apellidoMaterno',
  'rolId',
  'tituloCargo',
  'correo',
  'usuario',
  'estatus',
];

const CREATE_ONLY_VISIBLE_FIELDS = [
  'contrasena',
  'repeatContrasena',
];

export default function UserPanel({
  mode,
  user,
  loading,
  error,
  actionLoading,
  onClose,
  onCreate,
  onUpdate,
  onNotify,
  sessionRole,
}) {
  const visibleFields = mode === VIEW_STATE.CREATE
    ? [...BASE_VISIBLE_FIELDS, ...CREATE_ONLY_VISIBLE_FIELDS]
    : BASE_VISIBLE_FIELDS;

  const {
    form,
    errors,
    handleChange,
    handleBlur,
    validate,
  } = useUserForm({
    mode,
    initialUser: user,
    sessionRole,
    visibleFields,
  });

  const isCreate = mode === VIEW_STATE.CREATE;
  const isEdit = mode === VIEW_STATE.EDIT;
  const isView = mode === VIEW_STATE.VIEW;
  const canEditRoleAndStatus = sessionRole === 'admin';

  const submitAction = async () => {
    if (actionLoading) {
      return;
    }

    const { valid, cleanedData, errors: validationErrors } = validate();
    if (!valid) {
      const firstError = validationErrors
        ? Object.values(validationErrors).find((message) => Boolean(message))
        : null;

      onNotify.error(firstError || 'Revisa los campos obligatorios antes de continuar.');
      return;
    }

    if (isCreate) {
      await onCreate(cleanedData);
      return;
    }

    if (isEdit && user?.id) {
      const candidatePayload = canEditRoleAndStatus
        ? cleanedData
        : {
          ...cleanedData,
          rolId: user?.rol?.id ?? cleanedData.rolId,
          estatus: user?.estatus ?? cleanedData.estatus,
        };

      const payload = buildChangedUpdatePayload({
        initialUser: user,
        candidatePayload,
        sessionRole,
      });

      if (Object.keys(payload).length === 0) {
        onNotify.success('No hay cambios para guardar.');
        onClose();
        return;
      }

      await onUpdate(user.id, payload);
    }
  };

  const handleSubmit = () => {
    if (actionLoading) {
      return;
    }

    submitAction();
  };

  if (loading && !user) {
    return <UsersSkeleton />;
  }

  if (error) {
    return (
      <Stack spacing={2} sx={{ padding: 2 }}>
        <Typography variant="body2">No se pudo cargar el usuario.</Typography>
        <Typography variant="body2">{error?.message || 'Error desconocido'}</Typography>
        <Button variant="outlined" onClick={onClose}>Volver</Button>
      </Stack>
    );
  }

  return (
    <Box sx={{ paddingTop: 1 }}>
      {(mode === VIEW_STATE.CREATE || mode === VIEW_STATE.EDIT) && (
        <UserForm
          mode={mode}
          form={form}
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          onCancel={onClose}
          sessionRole={sessionRole}
        />
      )}

      {mode === VIEW_STATE.VIEW && user && (
        <UserForm
          mode={mode}
          form={form}
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          onCancel={onClose}
          sessionRole={sessionRole}
        />
      )}

      {!user && isView && (
        <Stack spacing={2} sx={{ padding: 2 }}>
          <Typography variant="body2">No hay informacion para mostrar.</Typography>
        </Stack>
      )}
    </Box>
  );
}

UserPanel.propTypes = {
  mode: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    estatus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rol: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  actionLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNotify: PropTypes.shape({
    error: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
  }).isRequired,
  sessionRole: PropTypes.string.isRequired,
};

UserPanel.defaultProps = {
  user: null,
  error: null,
  actionLoading: false,
};
