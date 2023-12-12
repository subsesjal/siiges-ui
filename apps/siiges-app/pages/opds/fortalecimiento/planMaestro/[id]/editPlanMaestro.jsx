import { PlanMaestro } from '@siiges-ui/opds';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function EditPlanMaestro() {
  return (
    <Layout title="Plan Maestro" subtitle="Editar Plan Maestro">
      <PlanMaestro type="editar" />
    </Layout>
  );
}
