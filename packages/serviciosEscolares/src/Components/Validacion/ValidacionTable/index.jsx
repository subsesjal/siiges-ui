import { DataTable } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import columnsValidacion from '../../../Tables/validacionTable';

export default function ValidacionTable({ institucion, alumnos, programa }) {
  const [rows, setRows] = useState(alumnos);

  useEffect(() => {
    setRows(alumnos);
  }, [alumnos]);

  const handleSituacionValidacionUpdated = (alumnoId, situacionValidacionId, situacionNombre) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === alumnoId
      ? { ...row, situacionValidacionId, validacion: situacionNombre }
      : row)));
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        rows={rows}
        columns={columnsValidacion(programa, institucion, handleSituacionValidacionUpdated)}
        title="Tabla de validaciones"
      />
    </Grid>
  );
}

ValidacionTable.propTypes = {
  alumnos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired,
  programa: PropTypes.number.isRequired,
  institucion: PropTypes.number.isRequired,
};
