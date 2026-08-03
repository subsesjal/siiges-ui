import React, { useEffect } from 'react';
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
  Loading,
  useAuth,
  useNotification,
} from '@siiges-ui/shared';
import { UsuarioAvatar } from '@siiges-ui/users';
import useUserDetail from '../../hooks/useUserDetail';
import UserProfileSkeleton from '../UserProfileSkeleton';
import UserProfileViewSections from '../UserProfileViewSections';

export default function UserProfilePage() {
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

  const profileUser = detailState.data;
  const isInitialLoading = detailState.loading && !profileUser;

  if (isInitialLoading) {
    return (
      <Layout>
        <Loading loading={isInitialLoading} />
        <UserProfileSkeleton />
      </Layout>
    );
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
      <Loading loading={detailState.loading && !profileUser} />
      <Box sx={{ paddingX: 2, paddingTop: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              mt: { xs: 2, md: 0 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <UsuarioAvatar usuario={profileUser} />
          </Grid>

          <UserProfileViewSections user={profileUser} />

          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <ButtonSimple
                  onClick={() => router.push('/usuarios/perfilUsuario/editar')}
                  text="Editar perfil"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
