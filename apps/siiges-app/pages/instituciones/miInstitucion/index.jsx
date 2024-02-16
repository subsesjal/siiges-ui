import React, { useContext } from 'react';
import { Context, Layout, useApi } from '@siiges-ui/shared';
import { InstitucionLayout } from '@siiges-ui/instituciones';
import { CircularProgress } from '@mui/material';

const getInstitucion = (session) => {
  const { id, rol } = session;

  if (id && rol === 'representante') {
    const { data, loading } = useApi({
      endpoint: `api/v1/instituciones/usuarios/${id}`,
      method: 'GET',
    });

    return { institucion: data, loading };
  }

  /* if (id && rol === 'gestor') {
    const { data, loading } = useApi({ endpoint, method });
    return { ...data, loading };
  } */

  return { institucion: {}, loading: true };
};

export default function ConsultarInstitucion() {
  const { session } = useContext(Context);

  const { institucion, loading } = getInstitucion(session);

  return (
    <div>
      {!loading ? (
        <InstitucionLayout institucion={institucion} />
      ) : (
        <Layout>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
            }}
          >
            <CircularProgress />
          </div>
        </Layout>
      )}
    </div>
  );
}
