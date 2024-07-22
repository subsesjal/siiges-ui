import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlantelContext from '../utils/Context/plantelContext';

export default function RatificacionNombre({ disabled }) {
  const { form } = useContext(PlantelContext);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Ratificación de nombre</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="nombreSolicitado"
            label="Nombre solicitado"
            name="nombreSolicitado"
            auto="nombreSolicitado"
            value={form[6]?.nombreSolicitado || ''}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="nombreAutorizado"
            label="Nombre autorizado"
            name="nombreAutorizado"
            auto="nombreAutorizado"
            value={form[6]?.nombreAutorizado || ''}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="acuerdo"
            label="Acuerdo"
            name="acuerdo"
            auto="acuerdo"
            value={form[6]?.acuerdo || ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="instanciaAutoriza"
            label="Instancia que autoriza"
            name="instanciaAutoriza"
            auto="instanciaAutoriza"
            value={form[6]?.instanciaAutoriza || ''}
            required
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

RatificacionNombre.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
