import { Layout } from '@siiges-ui/shared';
import {
  Asignaturas,
  CiclosEscolares,
  Grupos,
  ProgramasData,
  Reglas,
} from '@siiges-ui/serviciosescolares';
import React, { useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';

export default function EditPrograma() {
  const [value, setValue] = useState(0);

  const tabsConfig = [
    { label: 'Programa', component: <ProgramasData /> },
    { label: 'Ciclos Escolares', component: <CiclosEscolares /> },
    { label: 'Grupos', component: <Grupos /> },
    { label: 'Reglas', component: <Reglas /> },
    { label: 'Asignaturas', component: <Asignaturas /> },
  ];

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
            {tabsConfig.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>
        </Grid>
        {tabsConfig[value].component}
      </Grid>
    </Layout>
  );
}
