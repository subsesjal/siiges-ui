import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';

function NewRequest() {
  return (
    <Layout type={false}>
      <NuevaSolicitud />
    </Layout>
  );
}

export default NewRequest;
