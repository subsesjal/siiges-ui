import { ButtonAdd, DataTable } from '@siiges-ui/shared';
import React from 'react';
import columnsAlumnos from '../../../Tables/AlumnosTable';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';

export default function AlumnosTable({ alumnos }) {
  const router = useRouter();
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <ButtonAdd
          text="Agregar Alumno"
          type="add"
          onClick={() => {router.push(`/serviciosEscolares/alumnos/NuevoAlumno`)}}
        />
      </Grid>
      <DataTable
        rows={alumnos}
        columns={columnsAlumnos}
        title="Tabla de alumnos"
      />
    </Grid>
  );
}
