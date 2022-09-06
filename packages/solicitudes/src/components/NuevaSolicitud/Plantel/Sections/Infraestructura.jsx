import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React from 'react';

const columns = [
  { field: 'instalation', headerName: 'Instalacion' },
  { field: 'capacity', headerName: 'Capacidad (alumnos)' },
  { field: 'meters', headerName: 'Mts2' },
  { field: 'resources', headerName: 'Recursos materiales' },
  { field: 'location', headerName: 'Ubicacion' },
  { field: 'asignaturas', headerName: 'Asignaturas' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    instalation: 'Edificio 1',
    capacity: 150,
    meters: 5000,
    resources: 'Mesas',
    location: 'Guadalajara',
    asignaturas: 'Matematicas',
    actions: 'iconos',
  },
  {
    id: 2,
    instalation: 'Edificio 2',
    capacity: 44,
    meters: 5000,
    resources: 'Sillas',
    location: 'Guadalajara',
    asignaturas: 'Fisica',
    actions: 'iconos',
  },
];

export default function Infraestructura() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <ButtonAdd text="agregar" />
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
    </Grid>
  );
}
