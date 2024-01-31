import React, { useContext, useEffect, useState } from 'react';

import { Layout, Context, useApi } from '@siiges-ui/shared';
import { UsuariosTable } from '@siiges-ui/users';
import { Divider } from '@mui/material';

const ENDPOINT_MAPPING = {
  representante: (usuarioId) => `api/v1/usuarios/${usuarioId}/usuarios`,
  admin: () => 'api/v1/usuarios',
};

function Usuarios() {
  const { session } = useContext(Context);
  const [endpoint, setEndpoint] = useState('/');
  const [method, setMethod] = useState('');

  useEffect(() => {
    if (session && session.id) {
      const { id, rol } = session;
      setEndpoint(ENDPOINT_MAPPING[rol](id));
      setMethod('GET');
    }
  }, [session]);

  const { data } = useApi({ endpoint, method });

  return (
    <Layout title="Usuarios">
      <Divider sx={{ marginTop: 2 }} />
      {data && (
        <UsuariosTable usuarios={data} session={session} />
      )}
    </Layout>
  );
}

export default Usuarios;
