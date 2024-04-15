import { Layout } from '@siiges-ui/shared';
import { ProgramasForm, ProgramasTable } from '@siiges-ui/serviciosescolares';
import React, { useState } from 'react';
import { Divider } from '@mui/material';

export default function Programas() {
  const [programas, setProgramas] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="Programas" loading={loading}>
      <ProgramasForm setProgramas={setProgramas} setLoading={setLoading} />
      <Divider sx={{ marginTop: 2 }} />
      {programas && (
        <ProgramasTable programas={programas} />
      )}
    </Layout>
  );
}
