import React, { useContext, useEffect } from 'react';
import { Context, Layout } from '@siiges-ui/shared';
import router from 'next/router';
import { UsuarioForm } from '@siiges-ui/users';
import { Divider } from '@mui/material';

export default function NewUser() {
  const { session } = useContext(Context);

  useEffect(() => {
    if (session.rol !== 'admin' && session.rol !== 'representante') {
      router.back();
    }
  }, [session]);

  return (
    <Layout title="Agregar Usuario">
      <Divider sx={{ mt: 5 }} />
      <UsuarioForm session={session} accion="crear" />
    </Layout>
  );
}
