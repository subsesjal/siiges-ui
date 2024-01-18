import { OrganosColegiados } from '@siiges-ui/opds';
import {
  Layout,
} from '@siiges-ui/shared';
import React from 'react';

export default function EditarSesion() {
  return (
    <Layout title="Organos Colegiados">
      <OrganosColegiados type="editar" />
    </Layout>
  );
}
