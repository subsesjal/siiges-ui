import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React from 'react';

const columns = [
  { field: 'name', headerName: 'Nombre de la institucion', width: 270 },
  { field: 'time', headerName: 'Tiempo de llegada', width: 100 },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    name: 'Jon Snow',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 4,
    name: 'Arya Stark',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 5,
    name: 'Daenerys Targaryen',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 6,
    name: 'Melisandre',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 7,
    name: 'Ferrara Clifford',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 8,
    name: 'Rossini Frances',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 9,
    name: 'Harvey Roxie',
    time: '9:00 a 17:00',
    actions: 'iconos',
  },
];

export default function InstitucionesAledanas() {
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
