import { DataTable, Layout, Select } from '@siiges-ui/shared';
import React from 'react';
import { columnsOrganosColegiados } from '@siiges-ui/opds';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';

export default function organosColegiados() {
  const router = useRouter();
  const rows = [
    {
      id: 1,
      institucion: 'Instituto Nacional de Tecnología',
      ano: 2022,
      sesion: 'Sesión 1',
      acuerdosConcluidos: 5,
      acuerdosProgreso: 3,
    },
    {
      id: 2,
      institucion: 'Universidad Autónoma de Ciencias',
      ano: 2023,
      sesion: 'Sesión 2',
      acuerdosConcluidos: 8,
      acuerdosProgreso: 2,
    },
    {
      id: 3,
      institucion: 'Centro de Investigación Ambiental',
      ano: 2021,
      sesion: 'Sesión 3',
      acuerdosConcluidos: 4,
      acuerdosProgreso: 6,
    },
  ];

  const handleOnChange = (event) => {
    console.log(`${event.target.name}: ${event.target.value}`);
  };

  return (
    <Layout title="Organos Colegiados">
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
            rows={rows}
            columns={columnsOrganosColegiados}
            buttonAdd
            buttonText="Crear Nueva Sesión"
            buttonClick={() => {
              router.push('/opds/organosColegiados/nuevaSesion');
            }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
