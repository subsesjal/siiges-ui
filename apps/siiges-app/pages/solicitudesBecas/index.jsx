import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import { BecasComponents } from '@siiges-ui/serviciosescolares';

export default function SolicitudesDeBecas() {
  const [becas, setBecas] = useState();
  const [programa, setPrograma] = useState();
  const [institucion, setInstitucion] = useState();
  return (
    <Layout title="Solicitudes de Becas Académicas">
      <BecasComponents.SolicitudesBecasFilter
        setBecas={setBecas}
        setPrograma={setPrograma}
        setInstitucion={setInstitucion}
      />
      <Divider sx={{ marginTop: 2 }} />
      {becas && (
      <BecasComponents.SolicitudesBecasTable
        becas={becas}
        programa={programa}
        institucion={institucion}
      />
      )}
    </Layout>
  );
}
