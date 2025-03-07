import { Layout, Context } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ServicioSocialComponent } from '@siiges-ui/serviciosescolares';

export default function ServicioSocial() {
  const [solicitudes, setSolicitudes] = useState([]);
  const { loading, setLoading } = useContext(Context);
  const [tableEnabled, setTableEnabled] = useState(false);

  return (
    <Layout title="Servicio Social" loading={loading}>
      <ServicioSocialComponent.SolicitudesServSocForm
        setSolicitudes={setSolicitudes}
        setLoading={setLoading}
        setTableEnabled={setTableEnabled}
      />
      <Divider sx={{ marginTop: 2 }} />
      <ServicioSocialComponent.SolicitudesServSocTable
        data={solicitudes}
        tableEnabled={tableEnabled}
      />
    </Layout>
  );
}
