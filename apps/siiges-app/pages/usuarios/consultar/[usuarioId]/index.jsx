import React, { useContext, useEffect, useState } from 'react';
import {
  Context, Layout, useApi, ButtonSimple,
} from '@siiges-ui/shared';
import { UsuarioAvatar, UsuarioView } from '@siiges-ui/users';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';

export default function ConsultarUsuario() {
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
    <Layout title="Consultar Usuarios">
      {data ? (
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ marginTop: 7 }}>
            <UsuarioAvatar usuario={data} />
          </Grid>
          <UsuarioView usuario={data} />
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <ButtonSimple onClick={() => router.back()} text="Regresar" />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        (<div>Loading...</div>)
      )}
    </Layout>
  );
}
