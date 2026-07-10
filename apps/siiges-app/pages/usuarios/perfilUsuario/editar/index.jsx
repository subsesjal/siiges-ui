import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Layout,
  Loading,
  useAuth,
} from '@siiges-ui/shared';
import { UserProfileEditPage } from '@siiges-ui/users/v2';
import { config } from '../../../../lib/config/env';

const USERS_VERSION = ['v1', 'v2'].includes(config.usersVersion) ? config.usersVersion : 'v1';

export default function UserProfileEditRoute() {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (USERS_VERSION === 'v2') {
      return;
    }

    if (session?.id) {
      router.replace(`/usuarios/editar/${session.id}`);
    }
  }, [router, session]);

  if (USERS_VERSION === 'v2') {
    return <UserProfileEditPage />;
  }

  return (
    <Layout title="Editar Perfil Usuario">
      <Loading loading />
    </Layout>
  );
}
