import React, { useContext, useState } from 'react';
import { Context, Layout } from '@siiges-ui/shared';
import { InstitucionBox, getInstitucionHook } from '@siiges-ui/instituciones';

export default function ConsultarInstitucion() {
  const { session, setNoti } = useContext(Context);
  const [institucion, setInstitucion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  getInstitucionHook({
    setInstitucion,
    session,
    setNoti,
    institucion,
    setLoading,
    loading,
  });

  return (
    <Layout title={title} loading={loading}>
      {(institucion && institucion.id)
        ? (
          <InstitucionBox
            institucion={institucion}
            setLoading={setLoading}
            setTitle={setTitle}
          />
        )
        : <div />}
    </Layout>
  );
}
