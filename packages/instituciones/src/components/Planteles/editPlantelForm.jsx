import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';

export default function EditPlantelForm({ plantel }) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Domicilio
      </Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label="Calle"
              id="calle"
              name="calle"
              auto="calle"
              value={plantel.domicilio.calle}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Numero exterior"
              id="numeroExterior"
              name="numeroExterior"
              auto="numeroExterior"
              value={plantel.domicilio.numeroExterior}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Numero interior"
              id="numeroInterior"
              name="numeroInterior"
              auto="numeroInterior"
              value={plantel.domicilio.numeroInterior}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Colonia"
              id="colonia"
              name="colonia"
              auto="colonia"
              value={plantel.domicilio.colonia}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Codigo Postal"
              id="codigoPostal"
              name="codigoPostal"
              auto="codigoPostal"
              value={plantel.domicilio.codigoPostal}
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos generales</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Correo institucional"
              id="correo1"
              name="correo1"
              auto="correo1"
              value={plantel.correo1}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo de contacto"
              id="correo2"
              name="correo2"
              auto="correo2"
              value={plantel.correo2}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo secundario"
              id="correo3"
              name="correo3"
              auto="correo3"
              value={plantel.correo3}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Telefono 1"
              id="telefono1"
              name="telefono1"
              auto="telefono1"
              value={plantel.telefono1}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Telefono 2"
              id="telefono2"
              name="telefono2"
              auto="telefono2"
              value={plantel.telefono2}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Telefono 3"
              id="telefono3"
              name="telefono3"
              auto="telefono3"
              value={plantel.telefono3}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Clave de centro de trabajo"
              id="claveCentroTrabajo"
              name="claveCentroTrabajo"
              auto="claveCentroTrabajo"
              value={plantel.claveCentroTrabajo}
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

EditPlantelForm.propTypes = {
  plantel: PropTypes.shape({
    domicilio: PropTypes.objectOf(PropTypes.string),
    correo1: PropTypes.string,
    correo2: PropTypes.string,
    correo3: PropTypes.string,
    telefono1: PropTypes.string,
    telefono2: PropTypes.string,
    telefono3: PropTypes.string,
    claveCentroTrabajo: PropTypes.string,
  }).isRequired,
};
