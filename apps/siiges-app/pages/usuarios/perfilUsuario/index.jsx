import React from 'react';
import {
  useAuth,
  Layout,
  getCurrentUser,
  ButtonSimple,
} from '@siiges-ui/shared';
import { UsuarioAvatar, UsuarioView } from '@siiges-ui/users';
import Grid from '@mui/material/Grid';
import { UserProfilePage } from '@siiges-ui/users/v2';
import { useRouter } from 'next/router';
import { getEnvVarValidated } from '../../../lib/config/env';

// Determina qué versión de perfil de usuario renderizar
const USERS_VERSION = getEnvVarValidated('NEXT_PUBLIC_USERS_VERSION', ['v1', 'v2'], 'v1');

export default function UserProfile() {
  const router = useRouter();
  const { session } = useAuth();
  const { user, loading } = getCurrentUser(session.id);

  // Si la versión es v2, renderizar el componente v2
  if (USERS_VERSION === 'v2') {
    return <UserProfilePage />;
  }

  return (
    <Layout>
      {loading ? (
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ marginTop: 7 }}>
            <UsuarioAvatar usuario={user} />
          </Grid>
          <UsuarioView usuario={user} />
          <Grid container justifyContent="flex-end" spacing={2} marginTo>
            <Grid item>
              <ButtonSimple onClick={() => router.back()} design="enviar" text="Regresar" />
            </Grid>
            <Grid item>
              <ButtonSimple onClick={() => router.push(`/usuarios/editar/${user.id}`)} text="Editar Perfil" />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div />
      )}
    </Layout>
  );
}
