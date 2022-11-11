import React, { useContext, useEffect } from 'react';
import { Context, Layout } from '@siiges-ui/shared';
import router from 'next/router';
import { NewUserForm } from '@siiges-ui/users';
import { Divider, Typography } from '@mui/material';

export default function NewUser() {
  const { session } = useContext(Context);

  useEffect(() => {
    if (session.rol !== 'admin' && session.rol !== 'representante') {
      router.back();
    }
  }, [session]);

  return (
    <Layout title="Nuevo Usuario" subtitle="Llena los siguientes datos">
      <Divider sx={{ mt: 5 }} />
      <Typography variant="p" sx={{ fontWeight: 'medium' }}>
        Datos Generales
      </Typography>
      <NewUserForm />
    </Layout>
  );
}
