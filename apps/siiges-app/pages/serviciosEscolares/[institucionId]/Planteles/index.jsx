import { PlantelesInstitucionesAuth, getInstituciones } from '@siiges-ui/instituciones';
import React from 'react';
import { Layout } from '@siiges-ui/shared';

export default function Index() {
  const { institucion, loading } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
  });

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
