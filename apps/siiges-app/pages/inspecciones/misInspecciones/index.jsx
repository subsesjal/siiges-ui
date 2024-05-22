import { DataTable, Layout } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';

const mockData = [
  {
    id: 1,
    folio: '12345',
    folioInspeccion: '12345',
    planEstudios: 'Ingeniería en Sistemas',
    status: 'Pendiente',
    inspeccion: 'Inspección 1',
    asignacion: 'Asignación A',
  },
  {
    id: 2,
    folio: '67890',
    folioInspeccion: '12345',
    planEstudios: 'Licenciatura en Administración',
    status: 'Completado',
    inspeccion: 'Inspección 2',
    asignacion: 'Asignación B',
  },
  {
    id: 3,
    folio: '11223',
    folioInspeccion: '12345',
    planEstudios: 'Maestría en Finanzas',
    status: 'En Proceso',
    inspeccion: 'Inspección 3',
    asignacion: 'Asignación C',
  },
];

export default function MisInspecciones() {
  return (
    <Layout title="Mis inspecciones">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable
            title="Lista de inspecciones"
            rows={mockData}
            columns={MisInspeccionesColumns}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
