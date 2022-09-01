import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { ButtonStyled, StepperComponent } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';

export default function ModuleHeader({ steps, type, date }) {
  return (
    <Card sx={{ width: '100%', mt: 5 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <StepperComponent steps={steps} position="1" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" sx={{ fontWeight: 'bold' }}>
              Tipo de solicitud:
              <span>&nbsp;</span>
            </Typography>
            <Typography variant="p">{type}</Typography>
            <br />
            <Typography variant="p" sx={{ fontWeight: 'bold' }}>
              Fecha de inicio:
              <span>&nbsp;</span>
            </Typography>
            <Typography variant="p">{date}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right', alignItems: 'end' }}>
            <ButtonStyled
              text="Terminar"
              alt="Terminar solicitud"
              type="success"
            />
            <span>&nbsp;&nbsp;</span>
            <ButtonStyled text="Salir" alt="Salir" type="success" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ModuleHeader.propTypes = {
  type: PropTypes.string.isRequired,
  steps: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
