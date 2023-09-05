import { PlantelesInstitucionesAuth, getInstitucion } from '@siiges-ui/instituciones';
import React from 'react';
import { Layout } from '@siiges-ui/shared';

export default function Index() {
  const { institucion, loading } = getInstitucion();

  return (
    <Layout title="Planteles">
      {loading ? (
        <PlantelesInstitucionesAuth
          institucion={institucion.data.id}
          data={institucion.data.planteles}
        />
      ) : null}
    </Layout>
  );
}
