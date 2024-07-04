import { FoliosData } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function EditFoliosTitulos() {
  return (
    <Layout title="Editar Folio de Titulo">
      <FoliosData solicitudType="titulo" />
    </Layout>
  );
}
