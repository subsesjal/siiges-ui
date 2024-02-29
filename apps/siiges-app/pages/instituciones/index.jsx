import React, { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { Divider } from '@mui/material';
import { Layout, Context } from '@siiges-ui/shared';
import { InstitucionesTable, getInstituciones } from '@siiges-ui/instituciones';

export default function Instituciones() {
  const { session } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { instituciones } = getInstituciones({ setLoading, tipoInstitucionId: 1 });

  useEffect(() => {
    const { id, rol } = session;
    if (session && id && rol === 'admin') {
      if (instituciones && instituciones.length) {
        setData(instituciones);
      }
    } else {
      router.back();
    }
  }, [data, instituciones]);

  return (
    <Layout title="Instituciones" loading={loading}>
      <Divider sx={{ marginTop: 2 }} />
      {(data && !loading) && (
      <InstitucionesTable instituciones={data} session={session} />
      )}
    </Layout>
  );
}
