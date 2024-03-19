import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';
import React from 'react';
import { useRouter } from 'next/router';

export default function EditarSolicitud() {
  const router = useRouter();
  const { query } = router;

  return (
    <Layout title="Editar solicitud">
      <NuevaSolicitud type="editar" solicitudId={query.id} />
    </Layout>
  );
}
