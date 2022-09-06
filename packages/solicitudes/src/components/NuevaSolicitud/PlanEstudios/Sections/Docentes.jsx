import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd, Input } from '@siiges-ui/shared';
import React from 'react';

const columns = [
  { field: 'name', headerName: 'Nombre' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'formation', headerName: 'Formacion profecional' },
  { field: 'asignatura', headerName: 'Asignatura' },
  { field: 'experience', headerName: 'Experiencia' },
  { field: 'hirability', headerName: 'Contratacion y antiguedad' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    name: 'Jon Snow',
    type: 'asignatura',
    formation: 'Maestria',
    asignatura: 'Matematicas',
    experience: 'Resumen',
    hirability: 'Resumen',
    actions: 'iconos',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    type: 'asignatura',
    formation: 'Maestria',
    asignatura: 'Matematicas',
    experience: 'Resumen',
    hirability: 'Resumen',
    actions: 'iconos',
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    type: 'asignatura',
    formation: 'Maestria',
    asignatura: 'Matematicas',
    experience: 'Resumen',
    hirability: 'Resumen',
    actions: 'iconos',
  },
];

export default function Docentes() {
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
      <Grid item xs={9}>
        <Input
          id="horasMin"
          label="Numero de horas minimas que se deberan acreditar bajo la conduccion de un docente"
          name="horasMin"
          auto="horasMin"
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="credMin"
          label="Numero minimo de creditos que se deberan acreditar"
          name="credMin"
          auto="credMin"
        />
      </Grid>
    </Grid>
  );
}
