import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';

export default function EditPlantelForm() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Domicilio
      </Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input label="Calle" id="street" street="street" auto="street" />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Numero exterior"
              id="extNum"
              name="extNum"
              auto="extNum"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Numero interior"
              id="intNum"
              name="intNum"
              auto="intNum"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input label="Colonia" id="colony" name="colony" auto="colony" />
          </Grid>
          <Grid item xs={3}>
            <Input label="Codigo Postal" id="CP" name="CP" auto="CP" />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos generales</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Correo institucional"
              id="instEmail"
              name="instEmail"
              auto="instEmail"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo de contacto"
              id="contactEmail"
              name="contactEmail"
              auto="contactEmail"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo secundario"
              id="altEmail"
              name="altEmail"
              auto="altEmail"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input label="Telefono 1" id="phone1" name="phone1" auto="phone1" />
          </Grid>
          <Grid item xs={3}>
            <Input label="Telefono 2" id="phone2" name="phone2" auto="phone2" />
          </Grid>
          <Grid item xs={3}>
            <Input label="Telefono 3" id="phone3" name="phone3" auto="phone3" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Clave de centro de trabajo"
              id="claveCentroTrabajo"
              name="claveCentroTrabajo"
              auto="claveCentroTrabajo"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Pagina Web"
              id="webSite"
              name="webSite"
              auto="webSite"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Redes sociales"
              id="socialNetwork"
              name="socialNetwork"
              auto="socialNetwork"
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos director</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Nombre(s)"
              id="directorName"
              name="directorName"
              auto="directorName"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Primer Apellido"
              id="directorLastName1"
              name="directorLastName1"
              auto="directorLastName1"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Segundo Apellido"
              id="directorLastName2"
              name="directorLastName2"
              auto="directorLastName2"
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos rector</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Nombre(s)"
              id="rectorName"
              name="rectorName"
              auto="rectorName"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Primer Apellido"
              id="rectorLastName1"
              name="rectorLastName1"
              auto="rectorLastName1"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Segundo Apellido"
              id="rectorLastName2"
              name="rectorLastName2"
              auto="rectorLastName2"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
