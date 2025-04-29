import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';
import React from 'react';
import { useRouter } from 'next/router';

export default function ObservacionesSolicitud() {
  const router = useRouter();
  const { query } = router;

  return (
    <Layout title="Revisar Solicitud">
      <NuevaSolicitud
        type="observaciones"
        solicitudId={query.id}
      />
    </Layout>
  );
}
