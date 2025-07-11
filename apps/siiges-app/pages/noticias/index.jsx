import { Layout } from '@siiges-ui/shared';
import { NoticiasTable } from '@siiges-ui/notificaciones';
import React from 'react';

export default function noticias() {
  return (
    <Layout title="Noticias">
      <NoticiasTable />
    </Layout>
  );
}
