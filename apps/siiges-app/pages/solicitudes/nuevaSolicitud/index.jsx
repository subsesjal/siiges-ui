import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Layout,
  useAuth,
  useUI,
} from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';

function NewRequest() {
  const router = useRouter();
  const { session } = useAuth();
  const { setNoti } = useUI();

  useEffect(() => {
    if (!session?.rol) return;

    if (session.rol !== 'representante' || session.estatus === false) {
      setNoti({
        open: true,
        type: 'error',
        message: 'Solo un usuario representante activo puede crear solicitudes.',
      });
      router.push('/solicitudes');
    }
  }, [session?.rol, session?.estatus]);

  return (
    <Layout type={false}>
      <NuevaSolicitud />
    </Layout>
  );
}

export default NewRequest;
