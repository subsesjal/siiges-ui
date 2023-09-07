import { ConsultPlantelesForm } from '@siiges-ui/instituciones';
import { Layout } from '@siiges-ui/shared';
import React from 'react';
import getPlantel from '@siiges-ui/instituciones/src/utils/getPlantel';

export default function consultarPlantel() {
  const { plantel, loading } = getPlantel();
  return (
    <Layout title="Plantel">
      {loading ? <ConsultPlantelesForm data={plantel.data} /> : <div />}
    </Layout>
  );
}
