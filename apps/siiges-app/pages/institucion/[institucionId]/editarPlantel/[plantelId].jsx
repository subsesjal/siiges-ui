import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { NewPlantelForm } from '@siiges-ui/instituciones';
import getPlantel from '@siiges-ui/instituciones/src/utils/getPlantel';

export default function EditarPlantel() {
  const { plantel, loading } = getPlantel();
  return (
    <Layout title="Editar Plantel">
      {loading ? <NewPlantelForm plantel={plantel.data} /> : <div />}
    </Layout>
  );
}
