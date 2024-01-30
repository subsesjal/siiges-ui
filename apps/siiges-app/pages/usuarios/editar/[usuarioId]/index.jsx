import React, { useContext, useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { Context, Layout, getData } from '@siiges-ui/shared';
import { UsuarioForm } from '@siiges-ui/users';

export default function EditUser() {
  const router = useRouter();
  const { session } = useContext(Context);
  const [usuario, setUsuario] = useState([{ id: '', nombre: '' }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.rol !== 'admin' && session.rol !== 'representante') {
          router.back();
          return;
        }

        if (router.isReady) {
          const { usuarioId } = router.query;
          const path = `/usuarios/${usuarioId}`;

          const usuarioData = await getData(path);

          setUsuario(usuarioData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    };
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [router.isReady, router.query, session]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Layout title="Modificar Usuario">
      <Divider sx={{ mt: 5 }} />
      {usuario.persona && <UsuarioForm session={session} accion="editar" usuario={usuario} />}
    </Layout>
  );
}
