import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Layout,
  Loading,
  useAuth,
  useNotification,
} from '@siiges-ui/shared';
import VIEW_STATE from '../../constants/viewState';
import useUserDetail from '../../hooks/useUserDetail';
import useUserForm from '../../hooks/useUserForm';
import { updateUser } from '../../services/usuarios.service';
import UserProfileEditForm from '../UserProfileEditForm';
import UserProfileSkeleton from '../UserProfileSkeleton';

export default function UserProfileEditPage() {
  const router = useRouter();
  const { session } = useAuth();
  const notify = useNotification();
  const [profileUser, setProfileUser] = useState(null);

  const detailState = useUserDetail({
    session,
    usuarioId: session?.id,
    enabled: Boolean(session?.id),
    initialData: null,
  });

  useEffect(() => {
    if (detailState.data) {
      setProfileUser(detailState.data);
    }
  }, [detailState.data]);

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
    initialUser: profileUser,
    sessionRole: session?.rol || '',
  });

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
      const payload = {
        ...cleanedData,
        rolId: profileUser?.rol?.id ?? cleanedData.rolId,
      };

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
