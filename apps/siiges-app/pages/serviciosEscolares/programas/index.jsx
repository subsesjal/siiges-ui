import { Layout } from '@siiges-ui/shared';
import { ProgramasForm, ProgramasTable } from '@siiges-ui/serviciosescolares';
import React, { useState } from 'react';
import { Divider } from '@mui/material';

export default function Programas() {
  const [programas, setProgramas] = useState();
  return (
    <Layout title="Programas">
      <ProgramasForm setProgramas={setProgramas} />
      <Divider sx={{ marginTop: 2 }} />
      {programas && (
        <ProgramasTable programas={programas} />
      )}
    </Layout>
  );
}
