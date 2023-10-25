import { ConsultarNotificacionForm } from '@siiges-ui/notificaciones';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function consultarPlantel() {
  // const { plantel, loading } = getPlantel();
  const loading = true;

  return (
    <Layout title="Plantel">
      {loading ? <ConsultarNotificacionForm data={{}} /> : <div />}
    </Layout>
  );
}
