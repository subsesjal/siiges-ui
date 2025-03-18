import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function AgregarSolicitudBecas() {
  const [setLoading] = useState(false);
  return (
    <Layout title="Modificar Solicitud de Becas">
      <BecasComponents.SolicitudesBecasBox setLoading={setLoading} type="editar" />
    </Layout>
  );
}
