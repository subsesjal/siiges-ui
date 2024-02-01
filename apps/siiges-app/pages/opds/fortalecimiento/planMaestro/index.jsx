import { Grid } from '@mui/material';
import { DataTable, Layout, Select } from '@siiges-ui/shared';
import React from 'react';
import { columnsPlanMaestro } from '@siiges-ui/opds';
import { useRouter } from 'next/router';

export default function PlanMaestro() {
  const router = useRouter();
  const planMaestro = [
    { id: 1, nombre: 'Project Alpha', ano: 2022 },
    { id: 2, nombre: 'Project Beta', ano: 2021 },
    { id: 3, nombre: 'Project Gamma', ano: 2023 },
    { id: 4, nombre: 'Project Delta', ano: 2022 },
    { id: 5, nombre: 'Project Epsilon', ano: 2020 },
  ];

  const handleOnChange = (event) => {
    console.log(`${event.target.name}: ${event.target.value}`);
  };

  return (
    <Layout title="Plan Maestro">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            title="Tipo de Periodo"
            name="tipoPeriodo"
            options={[]}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Tipo de Sesion"
            name="tipoSesion"
            options={[]}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            buttonAdd
            buttonText="Crear Nuevo Proyecto"
            buttonClick={() => {
              router.push('/opds/fortalecimiento/planMaestro/crearPlanMaestro');
            }}
            columns={columnsPlanMaestro}
            rows={planMaestro}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
