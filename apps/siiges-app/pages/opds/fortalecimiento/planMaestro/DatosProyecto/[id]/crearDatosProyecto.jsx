import { DatosProyectoForm } from '@siiges-ui/opds';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function editDatosProyecto() {
  return (
    <Layout title="Datos del Proyecto" subtitle="Crear Datos">
      <DatosProyectoForm type="crear" />
    </Layout>
  );
}
