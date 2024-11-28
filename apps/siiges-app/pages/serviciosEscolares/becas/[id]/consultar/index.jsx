import { AsignarBecas } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function ConsultarBecas() {
  return (
    <Layout title="Consultar Becas">
      <AsignarBecas type="consult" />
    </Layout>
  );
}
