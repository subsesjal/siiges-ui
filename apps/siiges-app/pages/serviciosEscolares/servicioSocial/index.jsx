import { Layout, Context } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ServicioSocialComponents } from '@siiges-ui/serviciosescolares';

export default function ServicioSocial() {
  const [solicitudes, setSolicitudes] = useState([]);
  const { setLoading } = useContext(Context);
  const [tableEnabled, setTableEnabled] = useState(false);

  return (
    <Layout title="Servicio Social">
      <ServicioSocialComponents.SolicitudServSocFilter
        setSolicitudes={setSolicitudes}
        setLoading={setLoading}
        setTableEnabled={setTableEnabled}
      />
      <Divider sx={{ marginTop: 2 }} />
      <ServicioSocialComponents.SolicitudServSocTable
        data={solicitudes}
        tableEnabled={tableEnabled}
      />
    </Layout>
  );
}
