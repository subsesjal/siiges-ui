import { Layout } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import {
  Asignaturas,
  CiclosEscolares,
  Grupos,
  ProgramasData,
  Reglas,
} from '@siiges-ui/serviciosescolares';
import getSolicitudesById from '@siiges-ui/solicitudes/src/components/utils/getSolicitudesById';
import getCiclosEscolares from '@siiges-ui/serviciosescolares/src/Components/utils/getCiclosEscolares';
import React, { useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';

export default function EditPrograma() {
  const router = useRouter();
  const { query } = router;
  const { solicitudesProgramas } = getSolicitudesById(query.id);
  const { ciclosEscolares } = getCiclosEscolares(query.id);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout title="Programas">
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Programa" />
            <Tab label="Ciclos Escolares" />
            <Tab label="Grupos" />
            <Tab label="Reglas" />
            <Tab label="Asignaturas" />
          </Tabs>
        </Grid>
        {value === 0 && <ProgramasData programa={solicitudesProgramas} />}
        {value === 1 && <CiclosEscolares ciclos={ciclosEscolares} />}
        {value === 2 && <Grupos />}
        {value === 3 && <Reglas />}
        {value === 4 && <Asignaturas />}
      </Grid>
    </Layout>
  );
}
