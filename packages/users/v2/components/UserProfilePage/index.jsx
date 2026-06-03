import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  ButtonSimple,
  Layout,
  useAuth,
  useNotification,
} from '@siiges-ui/shared';
import { UsuarioAvatar, UsuarioView } from '@siiges-ui/users';
import VIEW_STATE from '../../constants/viewState';
import useUserDetail from '../../hooks/useUserDetail';
import useUserForm from '../../hooks/useUserForm';
import { updateUser } from '../../services/usuarios.service';
import UserForm from '../UserForm';
import UsersSkeleton from '../UsersSkeleton';

export default function UserProfilePage() {
  const router = useRouter();
  const { session } = useAuth();
  const notify = useNotification();
  const [isEditing, setIsEditing] = useState(false);
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

  const handleCancelEdit = () => {
    setIsEditing(false);
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
      const updatedUser = await updateUser({
        session,
        usuarioId: profileUser.id,
        data: cleanedData,
      });

      setProfileUser(updatedUser);
      setIsEditing(false);
      notify.success('Perfil actualizado correctamente.');
    } catch (error) {
      notify.error(error?.message || 'No fue posible actualizar el perfil.');
    }
  };

  if (detailState.loading && !profileUser) {
    return <UsersSkeleton />;
  }

  if (detailState.error && !profileUser) {
    return (
      <Layout>
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
    <Layout>
      <Box sx={{ paddingX: 2, paddingTop: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              mt: { xs: 2, md: 0 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <UsuarioAvatar usuario={profileUser} />
          </Grid>

          {isEditing ? (
            <Grid item xs={12} md={8}>
              <UserForm
                mode={VIEW_STATE.EDIT}
                form={form}
                errors={errors}
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                onCancel={handleCancelEdit}
                sessionRole={session?.rol || ''}
              />
            </Grid>
          ) : (
            <UsuarioView usuario={profileUser} />
          )}

          {!isEditing && (
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                  <ButtonSimple onClick={() => router.back()} design="enviar" text="Regresar" />
                </Grid>
                <Grid item>
                  <ButtonSimple onClick={() => setIsEditing(true)} text="Editar perfil" />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
}
