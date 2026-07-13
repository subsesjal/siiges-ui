import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Stack,
  Typography,
} from '@mui/material';
import {
  ButtonSimple,
  Layout,
  Loading,
  useAuth,
  useNotification,
} from '@siiges-ui/shared';
import VIEW_STATE from '../../constants/viewState';
import useUserDetail from '../../hooks/useUserDetail';
import useUserForm from '../../hooks/useUserForm';
import { updateUser } from '../../services/usuarios.service';
import { buildChangedUpdatePayload } from '../../utils/userForm';
import UserProfileEditForm from '../UserProfileEditForm';
import UserProfileSkeleton from '../UserProfileSkeleton';

export default function UserProfileEditPage() {
  const router = useRouter();
  const { session } = useAuth();
  const notify = useNotification();

  const detailState = useUserDetail({
    session,
    usuarioId: session?.id,
    enabled: Boolean(session?.id),
    initialData: null,
  });

  useEffect(() => {
    if (detailState.error) {
      notify.error(
        detailState.error.message || 'No fue posible cargar el perfil.',
      );
    }
  }, [detailState.error, notify]);

  const {
    form,
    errors,
    handleChange,
    handleBlur,
    validate,
  } = useUserForm({
    mode: VIEW_STATE.EDIT,
    initialUser: detailState.data,
    sessionRole: session?.rol || '',
  });

  const profileUser = detailState.data;

  const handleCancel = () => {
    router.push('/usuarios/perfilUsuario');
  };

  const handleSubmit = async () => {
    if (!profileUser?.id || detailState.loading) {
      return;
    }

    const { valid, cleanedData, errors: validationErrors } = validate();
    if (!valid) {
      const firstError = validationErrors
        ? Object.values(validationErrors).find((message) => Boolean(message))
        : null;

      notify.error(firstError || 'Revisa los campos obligatorios antes de continuar.');
      return;
    }

    try {
      const candidatePayload = {
        ...cleanedData,
        rolId: profileUser?.rol?.id ?? cleanedData.rolId,
      };

      const payload = buildChangedUpdatePayload({
        initialUser: profileUser,
        candidatePayload,
        sessionRole: session?.rol || '',
      });

      if (Object.keys(payload).length === 0) {
        notify.success('No hay cambios para guardar.');
        router.push('/usuarios/perfilUsuario');
        return;
      }

      await updateUser({
        session,
        usuarioId: profileUser.id,
        data: payload,
      });

      notify.success('Perfil actualizado correctamente.');
      router.push('/usuarios/perfilUsuario');
    } catch (error) {
      notify.error(error?.message || 'No fue posible actualizar el perfil.');
    }
  };

  const isInitialLoading = detailState.loading && !profileUser;

  if (isInitialLoading) {
    return (
      <Layout title="Editar Perfil Usuario">
        <Loading loading={isInitialLoading} />
        <UserProfileSkeleton />
      </Layout>
    );
  }

  if (detailState.error && !profileUser) {
    return (
      <Layout title="Editar Perfil Usuario">
        <Stack spacing={2} sx={{ padding: 2 }}>
          <Typography variant="body2">No se pudo cargar el perfil.</Typography>
          <Typography variant="body2">{detailState.error.message || 'Error desconocido'}</Typography>
          <ButtonSimple onClick={() => router.back()} design="enviar" text="Regresar" />
        </Stack>
      </Layout>
    );
  }

  if (!profileUser) {
    return null;
  }

  return (
    <Layout title="Editar Perfil Usuario">
      <Loading loading={detailState.loading && !profileUser} />
      <UserProfileEditForm
        form={form}
        errors={errors}
        sessionRole={session?.rol || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Layout>
  );
}
