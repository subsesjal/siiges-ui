import React from 'react';
import { Layout, useUI } from '@siiges-ui/shared';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function AgregarSolicitudBecas() {
  const { setLoading } = useUI();

  return (
    <Layout title="Agregar Solicitud de Becas">
      <BecasComponents.SolicitudesBecasBox setLoading={setLoading} type="crear" />
    </Layout>
  );
}
