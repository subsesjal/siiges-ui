import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';
import {
  InscripcionForm,
  InscripcionesTable,
} from '@siiges-ui/serviciosescolares';

export default function Inscripcion() {
  const [asignaturas, setAsignaturas] = useState();

  console.log(asignaturas);

  return (
    <Layout title="Inscripción">
      <InscripcionForm setAsignaturas={setAsignaturas} />
      <InscripcionesTable />
    </Layout>
  );
}
