import { FormAsignacionInspecciones } from '@siiges-ui/inspecciones';
import { Layout } from '@siiges-ui/shared';
import getSolicitudesById from '@siiges-ui/solicitudes/src/components/utils/getSolicitudesById';
import React from 'react';
import { useRouter } from 'next/router';

export default function AsignacionInspecciones() {
  const router = useRouter();
  const { query } = router;
  const solicitud = getSolicitudesById(query.id);

  return (
    <Layout title="Asignación de inspecciones">
      <FormAsignacionInspecciones solicitud={solicitud.solicitudes} />
    </Layout>
  );
}
