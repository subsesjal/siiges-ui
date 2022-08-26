import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React from 'react';

const columns = [
  { field: 'name', headerName: 'Nombre' },
  { field: 'charge', headerName: 'Cargo' },
  { field: 'phone', headerName: 'Telefono' },
  { field: 'cellphone', headerName: 'Celular' },
  { field: 'email', headerName: 'Correo' },
  { field: 'schedule', headerName: 'Horario' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    name: 'Jon Snow',
    charge: 'jefe',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'juannieves@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'cerseilannister@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'jaimelannister@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 4,
    name: 'Arya Stark',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'aryastark@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 5,
    name: 'Daenerys Targaryen',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'daenerystargaryen@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 6,
    name: 'Melisandre',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'melisandre@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 7,
    name: 'Ferrara Clifford',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'ferraraclifford@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 8,
    name: 'Rossini Frances',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'rossinifrances@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
  {
    id: 9,
    name: 'Harvey Roxie',
    charge: 'usuario',
    phone: '33123456789',
    cellphone: '33123456789',
    email: 'harveyroxie@gmail.com',
    schedule: '9:00 a 17:00',
    actions: 'iconos',
  },
];

function DiligenciasData() {
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

export default DiligenciasData;
