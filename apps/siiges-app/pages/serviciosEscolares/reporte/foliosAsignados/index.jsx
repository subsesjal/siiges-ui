import { Layout } from '@siiges-ui/shared';
import React from 'react';
import { FormFoliosAsignados } from '@siiges-ui/serviciosescolares';

export default function Reporte() {
  return (
    <Layout title="Reporte de Folios Asignados">
      <FormFoliosAsignados />
    </Layout>
  );
}
