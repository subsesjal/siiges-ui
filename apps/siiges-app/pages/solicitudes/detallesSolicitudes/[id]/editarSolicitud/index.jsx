import { Layout, useAuth } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const AUTHORIZED_ROLES = ['admin', 'representante', 'gestor'];

export default function EditarSolicitud() {
  const router = useRouter();
  const { query } = router;
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.rol) return;

    if (!AUTHORIZED_ROLES.includes(session.rol)) {
      router.push('/home');
    }
  }, [session?.rol, router]);

  return (
    <Layout title="Editar solicitud">
      <NuevaSolicitud
        type="editar"
        solicitudId={query.id}
      />
    </Layout>
  );
}
