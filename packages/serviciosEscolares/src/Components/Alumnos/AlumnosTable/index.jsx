import { DataTable } from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import columnsAlumnos from '../../../Tables/alumnosTable';

export default function AlumnosTable({ alumnos, programa }) {
  const router = useRouter();
  const [rows, setRows] = useState(alumnos);

  useEffect(() => {
    setRows(alumnos);
  }, [alumnos]);

  const handleDeleteSuccess = (alumnoId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== alumnoId));
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        buttonAdd
        buttonText="Agregar Alumno"
        buttonClick={() => {
          router.push(`/serviciosEscolares/alumnos/${programa}/NuevoAlumno`);
        }}
        rows={rows}
        columns={columnsAlumnos(handleDeleteSuccess)}
        title="Tabla de alumnos"
      />
    </Grid>
  );
}

AlumnosTable.propTypes = {
  programa: PropTypes.number.isRequired,
  alumnos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
