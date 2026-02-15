import React from 'react';
import { Layout, useUI } from '@siiges-ui/shared';
import { ServicioSocialComponents } from '@siiges-ui/serviciosescolares';

export default function AgregarSolicitudBecas() {
  const { setLoading } = useUI();

  return (
    <Layout title="Agregar Solicitud Servicio Social">
      <ServicioSocialComponents.SolicitudesServSocBox setLoading={setLoading} type="crear" />
    </Layout>
  );
}
