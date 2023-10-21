import { Layout } from '@siiges-ui/shared';
import { AlumnosForm, AlumnosTable } from '@siiges-ui/serviciosescolares';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState();

  return (
    <Layout title="Alumnos">
      <AlumnosForm setAlumnos={setAlumnos} />
      <Divider sx={{ marginTop: 2 }} />
      {alumnos && <AlumnosTable alumnos={alumnos} />}
    </Layout>
  );
}
