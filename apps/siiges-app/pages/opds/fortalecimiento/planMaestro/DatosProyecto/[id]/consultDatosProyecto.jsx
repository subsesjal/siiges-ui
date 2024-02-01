import { DatosProyectoForm } from '@siiges-ui/opds';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function consultDatosProyecto() {
  return (
    <Layout title="Datos del Proyecto" subtitle="Editar Datos">
      <DatosProyectoForm type="consultar" />
    </Layout>
  );
}
