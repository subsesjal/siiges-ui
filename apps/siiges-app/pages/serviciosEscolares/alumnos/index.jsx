import { Layout } from '@siiges-ui/shared';
import { AlumnosForm, AlumnosTable } from '@siiges-ui/serviciosescolares';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState();
  const [programa, setPrograma] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="Alumnos" loading={loading}>
      <AlumnosForm setAlumnos={setAlumnos} setPrograma={setPrograma} setLoading={setLoading} />
      <Divider sx={{ marginTop: 2 }} />
      {alumnos && <AlumnosTable alumnos={alumnos} programa={programa} />}
    </Layout>
  );
}
