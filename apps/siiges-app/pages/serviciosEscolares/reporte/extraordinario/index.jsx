import { Layout } from '@siiges-ui/shared';
import { ReporteForm, ReporteTable } from '@siiges-ui/serviciosescolares';
import React, { useState } from 'react';

export default function Reporte() {
  const [institucion, setInstitucion] = useState();
  const [alumnos, setAlumnos] = useState();
  const [programa, setPrograma] = useState();
  const [loading, setLoading] = useState(true);
  const [cicloEscolar, setCicloEscolar] = useState('');

  return (
    <Layout title="Reporte de extraordinarios" loading={loading}>
      <ReporteForm
        setInstitucion={setInstitucion}
        setAlumnos={setAlumnos}
        setPrograma={setPrograma}
        setLoading={setLoading}
        setCicloEscolar={setCicloEscolar}
      />
      {alumnos && cicloEscolar && (
        <ReporteTable
          alumnos={alumnos}
          programa={programa}
          institucion={institucion}
        />
      )}
    </Layout>
  );
}
