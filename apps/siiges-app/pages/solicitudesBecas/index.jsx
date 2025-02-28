import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { SolicitudesBecasTable } from '@siiges-ui/serviciosescolares';

export default function SolicitudesDeBecas() {
  return (
    <Layout title="Solicitudes de becas">
      <SolicitudesBecasTable />
    </Layout>
  );
}
