import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function SolicitudesDeBecas() {
  const [becas, setBecas] = useState();
  const [programa, setPrograma] = useState();
  return (
    <Layout title="Solicitudes de Becas Académicas">
      <BecasComponents.SolicitudesBecasFilter setBecas={setBecas} setPrograma={setPrograma} />
      <Divider sx={{ marginTop: 2 }} />
      {becas && <BecasComponents.SolicitudesBecasTable becas={becas} programa={programa} />}
    </Layout>
  );
}
