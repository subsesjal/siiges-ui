import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function SolicitudesDeBecas() {
  return (
    <Layout title="Solicitudes de becas">
      <BecasComponents.SolicitudesBecasTable />
    </Layout>
  );
}
