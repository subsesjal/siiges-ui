import { PlanMaestro } from '@siiges-ui/opds';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function ConsultPlanMaestro() {
  return (
    <Layout title="Plan Maestro" subtitle="Consultar Plan Maestro">
      <PlanMaestro type="consultar" />
    </Layout>
  );
}
