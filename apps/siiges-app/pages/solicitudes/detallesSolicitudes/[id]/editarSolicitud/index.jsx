import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';
import React from 'react';
import { useRouter } from 'next/router';
import getSolicitudesById from '@siiges-ui/solicitudes/src/components/utils/getSolicitudesById';

export default function EditarSolicitud() {
  const router = useRouter();
  const { query } = router;
  const { solicitudes } = getSolicitudesById(query.id);
  return (
    <Layout title="Editar solicitud">
      <NuevaSolicitud type="editar" data={solicitudes} solicitudId={query.id} />
    </Layout>
  );
}
