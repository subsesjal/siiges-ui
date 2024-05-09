import { Layout } from '@siiges-ui/shared';
import { ValidacionForm, ValidacionTable } from '@siiges-ui/serviciosescolares';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

export default function Validacion() {
  const [institucion, setInstitucion] = useState();
  const [alumnos, setAlumnos] = useState();
  const [programa, setPrograma] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="Validación" loading={loading}>
      <ValidacionForm
        setInstitucion={setInstitucion}
        setAlumnos={setAlumnos}
        setPrograma={setPrograma}
        setLoading={setLoading}
      />
      <Divider sx={{ marginTop: 2 }} />
      {alumnos && (
        <ValidacionTable
          alumnos={alumnos}
          programa={programa}
          institucion={institucion}
        />
      )}
    </Layout>
  );
}
