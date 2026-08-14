import { Layout } from '@siiges-ui/shared';
import { ActivarProgramas } from '@siiges-ui/serviciosescolares';
import React, { useState } from 'react';

export default function ActivarProgramasPage() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="Activar Programas" loading={loading}>
      <ActivarProgramas setLoading={setLoading} />
    </Layout>
  );
}
