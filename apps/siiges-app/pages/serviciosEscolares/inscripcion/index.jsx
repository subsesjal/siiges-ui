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

  return (
    <Layout title="Inscripción">
      <InscripcionForm
        setAsignaturas={setAsignaturas}
        setProgramaId={setProgramaId}
        setGrupoId={setGrupoId}
      />
      {grupoId && (
        <InscripcionesTable
          asignaturas={asignaturas}
          programaId={programaId}
          grupoId={grupoId}
        />
      )}
    </Layout>
  );
}
