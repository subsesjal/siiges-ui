import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditarSolicitud() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { query } = router;

  return (
    <Layout title="Editar solicitud" loading={isLoading}>
      <NuevaSolicitud
        type="editar"
        solicitudId={query.id}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Layout>
  );
}
