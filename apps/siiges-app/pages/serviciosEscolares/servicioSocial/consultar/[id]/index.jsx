import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { ServicioSocialComponents } from '@siiges-ui/serviciosescolares';

export default function ConsultarSolicitudesServSoc() {
  const [setLoading] = useState(false);
  return (
    <Layout title="Consultar Solicitud Servicio Social">
      <ServicioSocialComponents.SolicitudesServSocBox setLoading={setLoading} type="consultar" />
    </Layout>
  );
}
