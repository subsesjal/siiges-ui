import React, { useEffect, useState } from 'react';

import { Layout, useApi, useAuth } from '@siiges-ui/shared';
import { UsuariosTable } from '@siiges-ui/users';
import { Divider } from '@mui/material';
import { UsersPage } from '@siiges-ui/users/v2';
import { config } from '../../lib/config/env';

const ENDPOINT_MAPPING = {
  representante: (usuarioId) => `api/v1/usuarios/${usuarioId}/usuarios`,
  admin: () => 'api/v1/usuarios',
  sicyt_editar: () => 'api/v1/usuarios',
};

const USERS_VERSION = ['v1', 'v2'].includes(config.usersVersion) ? config.usersVersion : 'v1';

function Usuarios() {
  const { session } = useAuth();
  const [endpoint, setEndpoint] = useState('/');
  const [method, setMethod] = useState('');

  useEffect(() => {
    if (USERS_VERSION === 'v2') {
      return;
    }

    if (session && session.id) {
      const { id, rol } = session;
      setEndpoint(ENDPOINT_MAPPING[rol](id));
      setMethod('GET');
    }
  }, [session]);

  const { data, loading } = useApi({ endpoint, method });

  if (USERS_VERSION === 'v2') {
    return <UsersPage />;
  }

  return (
    <Layout title="Usuarios">
      <Divider sx={{ marginTop: 2 }} />
      {(data && !loading) && (
        <UsuariosTable usuarios={data} session={session} />
      )}
    </Layout>
  );
}

export default Usuarios;
