import { AsignarBecas } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function EditarBecas() {
  return (
    <Layout title="Editar Becas">
      <AsignarBecas type="edit" />
    </Layout>
  );
}
