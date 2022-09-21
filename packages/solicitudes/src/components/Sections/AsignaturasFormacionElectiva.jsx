import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd, Input } from '@siiges-ui/shared';
import React from 'react';

const columns = [
  { field: 'grade', headerName: 'Grado' },
  { field: 'name', headerName: 'Nombre' },
  { field: 'clave', headerName: 'Clave' },
  { field: 'seriacion', headerName: 'Seriacion' },
  { field: 'horasDocente', headerName: 'Horas docente' },
  { field: 'horasIndependiente', headerName: 'Horas independiente' },
  { field: 'creditos', headerName: 'Creditos' },
  { field: 'area', headerName: 'Area' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    grade: 8,
    name: 'Jon Snow',
    clave: 3321561,
    seriacion: 321631,
    horasDocente: '9:00 a 17:00',
    horasIndependiente: '9:00 a 17:00',
    creditos: 100,
    area: 'Formacion general',
    actions: 'iconos',
  },
  {
    id: 2,
    grade: 8,
    name: 'Cersei Lannister',
    clave: 3321561,
    seriacion: 321631,
    horasDocente: '9:00 a 17:00',
    horasIndependiente: '9:00 a 17:00',
    creditos: 100,
    area: 'Formacion general',
    actions: 'iconos',
  },
  {
    id: 3,
    grade: 8,
    name: 'Jaime Lannister',
    clave: 3321561,
    seriacion: 321631,
    horasDocente: '9:00 a 17:00',
    horasIndependiente: '9:00 a 17:00',
    creditos: 100,
    area: 'Formacion general',
    actions: 'iconos',
  },
];

export default function AsignaturasFormacionElectiva() {
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
