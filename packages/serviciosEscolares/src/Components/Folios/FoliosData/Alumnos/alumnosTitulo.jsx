import { Grid } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalTitulo from '../Modal/titulos';

export default function AlumnosTitulo({
  rows, columns, setType, type, id,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonClick={() => {
            setType('create');
            setOpen(true);
          }}
          buttonText="Agregar alumno"
          rows={rows}
          columns={columns}
        />
      </Grid>
      <ModalTitulo
        open={open}
        setOpen={setOpen}
        type={type}
        id={id}
      />
    </Grid>
  );
}

AlumnosTitulo.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      folio: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
      renderCell: PropTypes.func,
    }),
  ).isRequired,
  setType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
