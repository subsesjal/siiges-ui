import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';
import {
  InscripcionForm,
  InscripcionesTable,
} from '@siiges-ui/serviciosescolares';

export default function Inscripcion() {
  const [asignaturas, setAsignaturas] = useState();
  const [programaId, setProgramaId] = useState();
  const [grupoId, setGrupoId] = useState();
  const [cicloTxt, setCicloTxt] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="Inscripción" loading={loading}>
      <InscripcionForm
        setAsignaturas={setAsignaturas}
        setProgramaId={setProgramaId}
        setGrupoId={setGrupoId}
        setLoading={setLoading}
        setCicloTxt={setCicloTxt}
      />
      {grupoId && (
        <InscripcionesTable
          asignaturas={asignaturas}
          programaId={programaId}
          grupoId={grupoId}
          cicloTxt={cicloTxt}
        />
      )}
    </Layout>
  );
}
