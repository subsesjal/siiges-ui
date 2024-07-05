import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export default function SeguridadPlataformaEducativa() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Características de soporte técnico para garantizar la continuidad en
          la prestación del servicio educativo
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="basico"
                control={<Radio />}
                label="Resolución de problemas básicos"
              />
              <FormControlLabel
                value="especializado"
                control={<Radio />}
                label="Resolución de problemas por personal especializado"
              />
              <FormControlLabel
                value="experto"
                control={<Radio />}
                label="Resolución de problemas a nivel experto"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="medidasSeguridad"
            label="Descripción de las medidas de seguridad"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="incidenciasContingencia"
            label="Descripción de los pasos a seguir durante una incidencia o contingencia "
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
