import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { ServicioSocialComponents } from '@siiges-ui/serviciosescolares';

export default function EditarSolicitudesServSoc() {
  const [setLoading] = useState(false);
  return (
    <Layout title="Modificar Solicitud Servicio Social">
      <ServicioSocialComponents.SolicitudesServSocBox setLoading={setLoading} type="editar" />
    </Layout>
  );
}
