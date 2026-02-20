import React, { useState } from 'react';
import { useAuth, useUI, Layout } from '@siiges-ui/shared';
import { InstitucionForm, getInstitucionHook } from '@siiges-ui/instituciones';

export default function EditarInstitucion() {
  const { session } = useAuth();
  const { setNoti } = useUI();
  const [institucion, setInstitucion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  getInstitucionHook({
    setInstitucion,
    session,
    setNoti,
    institucion,
    setLoading,
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
            setNoti={setNoti}
          />
        )
        : <div />}
    </Layout>
  );
}
