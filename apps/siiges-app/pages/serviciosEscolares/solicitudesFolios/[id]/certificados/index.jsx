import { FoliosData } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function EditFoliosCertificados() {
  return (
    <Layout title="Editar Solicitud de Folios">
      <FoliosData solicitudType="certificado" type="edit" />
    </Layout>
  );
}
