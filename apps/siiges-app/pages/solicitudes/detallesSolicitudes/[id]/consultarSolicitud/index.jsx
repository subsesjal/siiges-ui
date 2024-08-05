import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';
import React from 'react';
import { useRouter } from 'next/router';

export default function ConsultarSolicitud() {
  const router = useRouter();
  const { query } = router;

  return (
    <Layout title="Consultar solicitud">
      <NuevaSolicitud
        type="consultar"
        solicitudId={query.id}
      />
    </Layout>
  );
}
