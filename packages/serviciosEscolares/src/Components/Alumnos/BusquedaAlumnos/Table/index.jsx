import { Grid } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import React from 'react';

const columns = (handleVerDetalle) => [
  {
    field: 'nombreCompleto',
    headerName: 'Nombre Completo',
    width: 300,
  },
  {
    field: 'curp',
    headerName: 'CURP',
    width: 150,
  },
  {
    field: 'claveTrabajo',
    headerName: 'Clave de trabajo',
    width: 150,
  },
  {
    field: 'programa',
    headerName: 'Programa',
    width: 250,
  },
  {
    field: 'matricula',
    headerName: 'Matricula',
    width: 150,
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <IconButton onClick={() => handleVerDetalle(params.row)}>
        <SearchIcon />
      </IconButton>
    ),
  },
];

export default function BusquedaAlumnosTable({ alumnos }) {
  const handleVerDetalle = (alumno) => {
    console.log('Ver detalle de alumno:', alumno);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title="Alumnos"
          columns={columns(handleVerDetalle)}
          rows={alumnos}
        />
      </Grid>
    </Grid>
  );
}

BusquedaAlumnosTable.defaultProps = {
  alumnos: [],
};

BusquedaAlumnosTable.propTypes = {
  alumnos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombreCompleto: PropTypes.string,
      curp: PropTypes.string,
      claveTrabajo: PropTypes.string,
      programa: PropTypes.string,
      matricula: PropTypes.string,
    }),
  ),
};
