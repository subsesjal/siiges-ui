import React, { useEffect } from 'react';
import { useAuth, Layout } from '@siiges-ui/shared';
import router from 'next/router';
import { UsuarioForm } from '@siiges-ui/users';
import { UserRoutePage } from '@siiges-ui/users/v2';
import { Divider } from '@mui/material';
import { config } from '../../../lib/config/env';

const USERS_VERSION = ['v1', 'v2'].includes(config.usersVersion) ? config.usersVersion : 'v1';

export default function NewUser() {
  const { session } = useAuth();

  useEffect(() => {
    if (USERS_VERSION === 'v2') {
      return;
    }

    if (session.rol !== 'admin' && session.rol !== 'representante') {
      router.back();
    }
  }, [session]);

  if (USERS_VERSION === 'v2') {
    return <UserRoutePage mode="CREATE" />;
  }

  return (
    <Layout title="Agregar Usuario">
      <Divider sx={{ mt: 5 }} />
      <UsuarioForm session={session} accion="crear" />
    </Layout>
  );
}
