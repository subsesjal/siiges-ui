import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import VIEW_STATE from '../../constants/viewState';
import UserForm from '../UserForm';
import UserDetails from '../UserDetails';
import useUserForm from '../../hooks/useUserForm';
import RoleChangeConfirmDialog from '../RoleChangeConfirmDialog';
import UsersSkeleton from '../UsersSkeleton';

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    form,
    errors,
    handleChange,
    handleBlur,
    validate,
    initialRoleId,
  } = useUserForm({ mode, initialUser: user, sessionRole });

  const isCreate = mode === VIEW_STATE.CREATE;
  const isEdit = mode === VIEW_STATE.EDIT;

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
      await onUpdate(user.id, cleanedData);
    }
  };

  const handleSubmit = () => {
    if (actionLoading) {
      return;
    }

    if (isEdit && String(initialRoleId || '') !== String(form.rolId || '')) {
      setConfirmOpen(true);
      return;
    }

    submitAction();
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
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
      <Stack direction="row" justifyContent="space-between" sx={{ paddingX: 2, paddingBottom: 1 }}>
        <Typography variant="h6">
          {mode === VIEW_STATE.VIEW ? 'Detalle de usuario' : 'Formulario de usuario'}
        </Typography>
        <Button variant="outlined" onClick={onClose}>Volver a tabla</Button>
      </Stack>

      {mode === VIEW_STATE.VIEW && user && <UserDetails user={user} />}

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

      {!user && mode === VIEW_STATE.VIEW && (
        <Stack spacing={2} sx={{ padding: 2 }}>
          <Typography variant="body2">No hay informacion para mostrar.</Typography>
        </Stack>
      )}

      <RoleChangeConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}

UserPanel.propTypes = {
  mode: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
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
  }).isRequired,
  sessionRole: PropTypes.string.isRequired,
};

UserPanel.defaultProps = {
  user: null,
  error: null,
  actionLoading: false,
};