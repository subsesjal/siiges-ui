import React, { useContext } from 'react';
import { Layout, Context } from '@siiges-ui/shared';
import { ServicioSocialComponents } from '@siiges-ui/serviciosescolares';

export default function AgregarSolicitudBecas() {
  const { setLoading } = useContext(Context);

  return (
    <Layout title="Agregar Solicitud Servicio Social">
      <ServicioSocialComponents.SolicitudesServSocBox setLoading={setLoading} type="crear" />
    </Layout>
  );
}
