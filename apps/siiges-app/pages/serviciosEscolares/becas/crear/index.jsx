import { AsignarBecas } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function CrearBecas() {
  return (
    <Layout title="Asignar Becas">
      <AsignarBecas type="create" />
    </Layout>
  );
}
