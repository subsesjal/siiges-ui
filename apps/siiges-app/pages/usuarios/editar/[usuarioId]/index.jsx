import React, { useContext, useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { Context, Layout, useApi } from '@siiges-ui/shared';
import { UsuarioForm } from '@siiges-ui/users';

export default function EditUser() {
  const router = useRouter();
  const { session } = useContext(Context);
  const [endpoint, setEndpoint] = useState();

  useEffect(() => {
    if (session.rol !== 'admin' && session.rol !== 'representante') {
      router.back();
      return;
    }

    if (router.isReady) {
      const { usuarioId } = router.query;
      setEndpoint(`api/v1/usuarios/${usuarioId}`);
    }
  }, [router.isReady]);

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
