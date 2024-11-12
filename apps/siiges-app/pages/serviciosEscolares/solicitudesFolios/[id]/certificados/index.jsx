import { FoliosData } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';
import { useRouter } from 'next/router';

export default function EditFoliosCertificados() {
  const router = useRouter();
  const { status } = router.query;

  const title = status === 'consult' ? 'Consultar Solicitud de Folios' : 'Editar Solicitud de Folios';
  return (
    <Layout title={title}>
      <FoliosData solicitudType="certificado" type="edit" />
    </Layout>
  );
}
