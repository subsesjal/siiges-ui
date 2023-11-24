import { Box, Grid } from '@mui/material';
import { Button, DataTable } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import columnsInscritosOrdinario from '../../../Tables/columnsInscritosOrdinario';

export default function CalOrdinarias({ disabled, labelAsignatura, alumnos }) {
  const router = useRouter();

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
  alumnos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
