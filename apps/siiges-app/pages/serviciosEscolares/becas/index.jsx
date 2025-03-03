import { BecasComponents } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function Becas() {
  return (
    <Layout title="Becas">
      <BecasComponents.SolicitudesBecasTable />
    </Layout>
  );
}
