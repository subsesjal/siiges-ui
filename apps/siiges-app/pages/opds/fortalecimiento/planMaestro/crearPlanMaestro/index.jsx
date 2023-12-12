import { PlanMaestro } from '@siiges-ui/opds';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function CrearPlanMaestro() {
  return (
    <Layout title="Plan Maestro" subtitle="Crear Plan Maestro">
      <PlanMaestro type="crear" />
    </Layout>
  );
}
