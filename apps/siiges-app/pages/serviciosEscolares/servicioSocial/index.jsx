import { Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { ServicioSocialComponents } from '@siiges-ui/serviciosescolares';

export default function ServicioSocial() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [programa, setPrograma] = useState();
  const [institucion, setInstitucion] = useState();
  const [tableEnabled, setTableEnabled] = useState(false);

  return (
    <Layout title="Solicitudes Servicio Social">
      <ServicioSocialComponents.SolicitudServSocFilter
        setSolicitudes={setSolicitudes}
        setPrograma={setPrograma}
        setInstitucion={setInstitucion}
        setTableEnabled={setTableEnabled}
      />
      <Divider sx={{ marginTop: 2 }} />
      {tableEnabled && (
        <ServicioSocialComponents.SolicitudServSocTable
          setSolicitudes={setSolicitudes}
          solicitudes={solicitudes}
          programa={programa}
          institucion={institucion}
        />
      )}
    </Layout>
  );
}
