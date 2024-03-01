import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { PlantelNewForm } from '@siiges-ui/instituciones';

export default function NewPlantel() {
  const [loading, setLoading] = useState(false);
  return (
    <Layout title="Agregar Plantel" loading={loading}>
      <PlantelNewForm setLoading={setLoading} />
    </Layout>
  );
}
