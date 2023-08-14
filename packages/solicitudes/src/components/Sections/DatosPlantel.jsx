import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function DatosPlantel({ plantel }) {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPlantel(name, form, setForm, value);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={9}>
          <Input
            label="Clave de centro de trabajo"
            id="claveCentroTrabajo"
            name="claveCentroTrabajo"
            auto="claveCentroTrabajo"
            value={plantel.domicilio.claveCentroTrabajo}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo institucional"
            id="correo1"
            name="correo1"
            auto="correo1"
            value={plantel.correo1}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Telefono 1"
            id="telefono1"
            name="telefono1"
            auto="telefono1"
            value={plantel.telefono1}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo de contacto"
            id="correo2"
            name="correo2"
            auto="correo2"
            value={plantel.correo2}
            required
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.correo2}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Telefono 2"
            id="telefono2"
            name="telefono2"
            auto="telefono2"
            value={plantel.telefono2}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo secundario"
            id="correo3"
            name="correo3"
            auto="correo3"
            value={plantel.correo3}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Telefono 3"
            id="telefono3"
            name="telefono3"
            auto="telefono3"
            value={plantel.telefono3}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="Redes sociales"
            id="socialNetwork"
            name="socialNetwork"
            auto="socialNetwork"
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            label="Pagina Web"
            id="webSite"
            name="webSite"
            auto="webSite"
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
