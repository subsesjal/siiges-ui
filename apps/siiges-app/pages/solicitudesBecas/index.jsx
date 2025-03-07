import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function SolicitudesDeBecas() {
  const [becas, setBecas] = useState();
  const [programa, setPrograma] = useState();
  const [loading, setLoading] = useState(true);
  return (
    <Layout title="Solicitudes de Becas Académicas" loading={loading}>
      <BecasComponents.SolicitudesBecasForm setBecas={setBecas} setPrograma={setPrograma} setLoading={setLoading} />
      <Divider sx={{ marginTop: 2 }} />
      {becas && <BecasComponents.SolicitudesBecasTable becas={becas} programa={programa} />}
    </Layout>
  );
}
