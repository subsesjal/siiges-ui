import { DataTable, Input } from '@siiges-ui/shared';
import React from 'react';
import { Grid } from '@mui/material';
import columnsAsignaturas from '../../../Tables/inscripcionesTable';

export default function InscripcionesTable() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Input
          label="Matricula"
          name="matricula"
          value=""
          onchange={() => {}}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={[]}
          columns={columnsAsignaturas}
          title="Tabla de asignaturas"
        />
      </Grid>
    </Grid>
  );
}
