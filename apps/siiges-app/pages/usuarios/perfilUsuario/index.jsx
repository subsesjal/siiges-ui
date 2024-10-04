import React, { useContext } from 'react';
import {
  Context,
  Layout,
  getCurrentUser,
  ButtonSimple,
} from '@siiges-ui/shared';
import { UsuarioAvatar, UsuarioView } from '@siiges-ui/users';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { session } = useContext(Context);
  const { user, loading } = getCurrentUser(session.id);
  return (
    <Layout>
      {loading ? (
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ marginTop: 7 }}>
            <UsuarioAvatar usuario={user} />
          </Grid>
          <UsuarioView usuario={user} />
          <Grid container justifyContent="flex-end" spacing={2}>
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
