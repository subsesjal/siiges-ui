import React, { useContext } from 'react';
import { Layout, Context } from '@siiges-ui/shared';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function AgregarSolicitudBecas() {
  const { loading, setLoading } = useContext(Context);

  return (
    <Layout title="Agregar Solicitud de Becas" loading={loading}>
      <BecasComponents.SolicitudesBecasBox setLoading={setLoading} type="crear" />
    </Layout>
  );
}
