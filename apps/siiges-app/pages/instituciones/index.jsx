import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { Divider } from '@mui/material';
import { Layout, useAuth } from '@siiges-ui/shared';
import { InstitucionesTable, getInstituciones } from '@siiges-ui/instituciones';

const USERS_AUTH = ['admin', 'sicyt_editar'];

export default function Instituciones() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { instituciones } = getInstituciones({ setLoading, tipoInstitucionId: 1 });

  useEffect(() => {
    if (!session) return;

    const { id, rol } = session;
    if (id && USERS_AUTH.includes(rol)) {
      if (instituciones && instituciones.length) {
        setData(instituciones);
      }
    } else {
      router.back();
    }
  }, [session, instituciones]);

  return (
    <Layout title="Instituciones" loading={loading}>
      <Divider sx={{ marginTop: 2 }} />
      {(data && !loading) && (
      <InstitucionesTable instituciones={data} session={session} />
      )}
    </Layout>
  );
}
