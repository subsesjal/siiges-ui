import { Button, DataTable } from '@siiges-ui/shared';
import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import columnsAlumnos from '../../../Tables/alumnosTable';

export default function AlumnosTable({ alumnos, programa }) {
  const router = useRouter();
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <Button
          text="Agregar Alumno"
          type="add"
          onClick={() => {
            router.push(`/serviciosEscolares/alumnos/${programa}/NuevoAlumno`);
          }}
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

AlumnosTable.propTypes = {
  programa: PropTypes.number.isRequired,
  alumnos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
