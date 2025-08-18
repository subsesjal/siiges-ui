/* eslint-disable no-unused-vars */
import {
  AcreditacionAsignaturas,
  InscripcionForm,
} from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';

export default function Acreditacion() {
  const [asignaturas, setAsignaturas] = useState();
  const [programaId, setProgramaId] = useState();
  const [cicloTxt, setCicloTxt] = useState();
  const [grupoId, setGrupoId] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="Acreditación" loading={loading}>
      <InscripcionForm
        setAsignaturas={setAsignaturas}
        setProgramaId={setProgramaId}
        setGrupoId={setGrupoId}
        setLoading={setLoading}
        setCicloTxt={setCicloTxt}
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
