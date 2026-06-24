import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth, Layout, useApi } from '@siiges-ui/shared';
import { UsuarioForm } from '@siiges-ui/users';
import { UserRoutePage } from '@siiges-ui/users/v2';
import { config } from '../../../../lib/config/env';

const USERS_VERSION = ['v1', 'v2'].includes(config.usersVersion) ? config.usersVersion : 'v1';

export default function EditUser() {
  const router = useRouter();
  const { session } = useAuth();
  const [endpoint, setEndpoint] = useState();

  useEffect(() => {
    if (USERS_VERSION === 'v2') {
      return;
    }

    if (session.rol !== 'admin' && session.rol !== 'representante') {
      router.back();
      return;
    }

    if (router.isReady) {
      const { usuarioId } = router.query;
      setEndpoint(`api/v1/usuarios/${usuarioId}`);
    }
  }, [router.isReady, session]);

  if (USERS_VERSION === 'v2') {
    return <UserRoutePage mode="EDIT" />;
  }

  const { data } = useApi({
    endpoint,
  });

  return (
    <Layout title="Modificar Usuario">
      <Divider sx={{ mt: 5 }} />
      { data && <UsuarioForm session={session} accion="editar" usuario={data} />}
    </Layout>
  );
}
