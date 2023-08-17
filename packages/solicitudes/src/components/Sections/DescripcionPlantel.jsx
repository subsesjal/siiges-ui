import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function DescripcionPlantel() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Descripción del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="caracteristics"
            label="Caracteristicas del inmueble"
            name="caracteristics"
            auto="caracteristics"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="dimentionsPlantel"
            label="Dimenciones del Plantel"
            name="dimentionsPlantel"
            auto="dimentionsPlantel"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Edificios y/o niveles</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Sotano" />
            <FormControlLabel control={<Checkbox />} label="Planta baja" />
            <FormControlLabel control={<Checkbox />} label="Primer piso" />
            <FormControlLabel control={<Checkbox />} label="Segundo piso" />
            <FormControlLabel control={<Checkbox />} label="Tercer piso" />
            <FormControlLabel control={<Checkbox />} label="Cuarto piso" />
          </FormGroup>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Sistemas de seguridad</Typography>
          <Input
            id="recubrimientosPlasticos"
            label="Recubrimientos plasticos en pisos y escalones"
            name="recubrimientosPlasticos"
            auto="recubrimientosPlasticos"
          />
          <Input
            id="alarmaIncendiosTerremotos"
            label="Alarma contra incendios y/o terremotos"
            name="alarmaIncendiosTerremotos"
            auto="alarmaIncendiosTerremotos"
          />
          <Input
            id="senalamientosEvacuacion"
            label="Señalamientos de evacuacion"
            name="senalamientosEvacuacion"
            auto="senalamientosEvacuacion"
          />
          <Input
            id="botiquin"
            label="Botiquin"
            name="botiquin"
            auto="botiquin"
          />
          <Input
            id="emergencyStairs"
            label="Escaleras de emergencia"
            name="emergencyStairs"
            auto="emergencyStairs"
          />
          <Input
            id="areaSeguridad"
            label="Area de seguridad"
            name="areaSeguridad"
            auto="areaSeguridad"
          />
          <Input
            id="extintores"
            label="Extintores"
            name="extintores"
            auto="extintores"
          />
          <Input
            id="puntosReunionEvacuacion"
            label="Puntos de reunion para evacuacion"
            name="puntosReunionEvacuacion"
            auto="puntosReunionEvacuacion"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
