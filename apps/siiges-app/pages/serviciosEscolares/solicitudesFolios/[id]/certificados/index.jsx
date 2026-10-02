import { FoliosData, readModo } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditFoliosCertificados() {
  const router = useRouter();
  const { id, status } = router.query;
  const [modoGuardado, setModoGuardado] = useState(null);

  useEffect(() => {
    if (id) setModoGuardado(readModo(id));
  }, [id]);

  const modo = modoGuardado || status;

  const title = modo === 'consult' ? 'Consultar Solicitud de Folios' : 'Editar Solicitud de Folios';
  return (
    <Layout title={title}>
      <FoliosData solicitudType="certificado" type="edit" />
    </Layout>
  );
}
