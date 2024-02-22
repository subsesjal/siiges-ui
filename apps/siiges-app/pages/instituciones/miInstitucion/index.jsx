import React, { useContext, useState } from 'react';
import { Context, Layout } from '@siiges-ui/shared';
import { InstitucionBox, InstitucionForm, getInstitucionHook } from '@siiges-ui/instituciones';

export default function ConsultarInstitucion() {
  const { session, setLoading, setNoti } = useContext(Context);
  const [institucion, setInstitucion] = useState(null);

  getInstitucionHook({
    setInstitucion, session, setLoading, setNoti,
  });

  return (
    <Layout title={institucion ? 'Institución' : 'Registrar Institución'}>
      {institucion
        ? <InstitucionBox institucion={institucion} />
        : <InstitucionForm session={session} accion="crear" />}
    </Layout>
  );
}
