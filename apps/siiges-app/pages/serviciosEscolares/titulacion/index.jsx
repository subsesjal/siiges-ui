import { AlumnosForm, TitulacionTable } from '@siiges-ui/serviciosescolares';
import { Context, Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useState, useContext } from 'react';

export default function Titulacion() {
  const { setLoading } = useContext(Context);
  const [alumnos, setAlumnos] = useState();
  const [programa, setPrograma] = useState();

  const alumnosEgresados = alumnos?.filter(
    (alumno) => alumno.situacion?.toLowerCase() === 'egresado',
  );

  return (
    <Layout title="Titulación">
      <AlumnosForm
        setAlumnos={setAlumnos}
        setPrograma={setPrograma}
        setLoading={setLoading}
      />
      <Divider sx={{ marginTop: 2 }} />
      {alumnos && <TitulacionTable alumnos={alumnosEgresados} programa={programa} />}
    </Layout>
  );
}
