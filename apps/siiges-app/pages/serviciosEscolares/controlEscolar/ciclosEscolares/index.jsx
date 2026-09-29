import { Layout } from '@siiges-ui/shared';
import { CatalogoCiclosEscolares } from '@siiges-ui/serviciosescolares';
import React from 'react';

export default function CiclosEscolaresCatalogo() {
  return (
    <Layout title="Ciclos Escolares">
      <CatalogoCiclosEscolares />
    </Layout>
  );
}
