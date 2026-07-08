import React from 'react';
import { Grid } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import PropTypes from 'prop-types';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 350 },
  { field: 'curp', headerName: 'CURP', width: 250 },
  { field: 'fechaInicioAntecedentes', headerName: 'Fecha de Inicio de Antecedentes', width: 260 },
  { field: 'fechaFinAntecedentes', headerName: 'Fecha de Fin de Antecedentes', width: 260 },
  { field: 'fechaExpedicion', headerName: 'Fecha de Expedición', width: 200 },
  { field: 'tipoValidacion', headerName: 'Tipo de Validación', width: 250 },
];

export default function AlumnosInactivosTable({ matriculas }) {
  const rows = matriculas.map((validaciones) => ({
    ...validaciones,
    id: validaciones.id,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable title="Alumnos" columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
}

AlumnosInactivosTable.defaultProps = {
  matriculas: [],
};

AlumnosInactivosTable.propTypes = {
  matriculas: PropTypes.arrayOf(
    PropTypes.shape({
      validacionId: PropTypes.number.isRequired,
      tipoValidacion: PropTypes.string,
      institucion: PropTypes.string,
      totalAlumnos: PropTypes.number,
    }),
  ),
};
