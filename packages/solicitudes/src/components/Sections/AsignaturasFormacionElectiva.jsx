import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd, Input } from '@siiges-ui/shared';
import React from 'react';
import { columns, rows } from './Mocks/AsignaturasFormacionElectiva';

export default function AsignaturasFormacionElectiva() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas formacion electiva</Typography>
      </Grid>
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
