import React, { useContext } from 'react';
import { Layout, Context } from '@siiges-ui/shared';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function AgregarSolicitudBecas() {
  const { setLoading } = useContext(Context);

  return (
    <Layout title="Agregar Solicitud de Becas">
      <BecasComponents.SolicitudesBecasBox setLoading={setLoading} type="crear" />
    </Layout>
  );
}
