import {
  AcreditacionAsignaturas,
  InscripcionForm,
} from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';

export default function Acreditacion() {
  const [asignaturas, setAsignaturas] = useState();
  const [programaId, setProgramaId] = useState();
  const [grupoId, setGrupoId] = useState();

  return (
    <Layout title="Acreditación">
      <InscripcionForm
        setAsignaturas={setAsignaturas}
        setProgramaId={setProgramaId}
        setGrupoId={setGrupoId}
      />
      {grupoId && (
        <AcreditacionAsignaturas
          asignaturas={asignaturas}
          programaId={programaId}
          grupoId={grupoId}
        />
      )}
    </Layout>
  );
}
