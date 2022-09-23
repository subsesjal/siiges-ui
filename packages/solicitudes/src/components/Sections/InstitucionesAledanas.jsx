import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React from 'react';
import { rows, columns } from './Mocks/InstitucionesAledanas';

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
