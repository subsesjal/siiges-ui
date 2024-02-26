import React, { useContext, useState } from 'react';
import { Context, Layout } from '@siiges-ui/shared';
import { InstitucionForm, getInstitucionHook } from '@siiges-ui/instituciones';

export default function EditarInstitucion() {
  const { session, setNoti, router } = useContext(Context);
  const [institucion, setInstitucion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  getInstitucionHook({
    setInstitucion,
    session,
    setNoti,
    institucion,
    setLoading,
    router,
  });

  return (
    <Layout title={title} loading={loading}>
      {institucion && session
        ? (
          <InstitucionForm
            session={session}
            institucion={institucion}
            accion="editar"
            setLoading={setLoading}
            setTitle={setTitle}
          />
        )
        : <div />}
    </Layout>
  );
}
