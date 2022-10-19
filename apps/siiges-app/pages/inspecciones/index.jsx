import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { InspeccionesTable } from '@siiges-ui/inspecciones';

export default function Inspecciones() {
  return (
    <Layout title="Inspecciones">
      <InspeccionesTable />
    </Layout>
  );
}
