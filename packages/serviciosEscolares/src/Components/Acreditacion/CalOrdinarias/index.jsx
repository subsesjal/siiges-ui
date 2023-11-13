import { Box, Grid } from '@mui/material';
import { Button, DataTable } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import columnsInscritosOrdinario from '../../../Tables/columnsInscritosOrdinario';

export default function CalOrdinarias({ disabled, labelAsignatura }) {
  const router = useRouter();
  const alumnos = [
    { id: 1, matricula: 'A001', nombre: 'Juan Pérez' },
    { id: 2, matricula: 'A002', nombre: 'Laura García' },
    { id: 3, matricula: 'A003', nombre: 'Carlos Sánchez' },
    { id: 4, matricula: 'A004', nombre: 'Ana Torres' },
    { id: 5, matricula: 'A005', nombre: 'Miguel Hernández' },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title={labelAsignatura}
          rows={alumnos}
          columns={columnsInscritosOrdinario(disabled)}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          text="Cancelar"
          type="cancel"
          onClick={() => {
            router.back();
          }}
        />
      </Grid>
      {!disabled && (
        <Grid item xs={9}>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button text="Editar calificaciones" type="edit" />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

CalOrdinarias.propTypes = {
  disabled: PropTypes.bool.isRequired,
  labelAsignatura: PropTypes.string.isRequired,
};
