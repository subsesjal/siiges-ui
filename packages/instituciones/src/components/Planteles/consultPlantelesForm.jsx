import {
  Divider, Grid, List, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';
import React from 'react';

export default function ConsultPlantelesForm({ data }) {
  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Domicilio
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Calle" />
              <ListTitle text="Número Interior" />
              <ListTitle text="Número Exterior" />
              <ListTitle text="Colonia" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={data.domicilio.calle} />
              <ListSubtitle text={data.domicilio.numeroInterior} />
              <ListSubtitle text={data.domicilio.numeroExterior} />
              <ListSubtitle text={data.domicilio.colonia} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Codigo Postal" />
              <ListTitle text="Municipio" />
              <ListTitle text="Clave del centro de trabajo" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={data.domicilio.codigoPostal} />
              <ListSubtitle text={data.domicilio.municipio.nombre} />
              <ListSubtitle text={data.domicilio.calle} />
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Datos Generales
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{
          xs: 1,
          sm: 2,
          md: 3,
        }}
      >
        <Grid container xs={5}>
          <Grid item xs>
            <List>
              <ListTitle text="Correo institucional" />
              <ListTitle text="Correo de contacto" />
              <ListTitle text="Correo secundario" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={data.correo1} />
              <ListSubtitle text={data.correo2} />
              <ListSubtitle text={data.correo3} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={3}>
          <Grid item xs>
            <List>
              <ListTitle text="Telefono 1" />
              <ListTitle text="Telefono 2" />
              <ListTitle text="Telefono 3" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={data.telefono1} />
              <ListSubtitle text={data.telefono2} />
              <ListSubtitle text={data.telefono3} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={4}>
          <Grid item xs>
            <List>
              <ListTitle text="Pagina web" />
              <ListTitle text="Redes sociales" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text="" />
              <ListSubtitle text="" />
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Datos Director
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{
          xs: 1,
          sm: 2,
          md: 3,
        }}
      >
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Nombre(s)" />
              <ListTitle text="Apellido Paterno" />
              <ListTitle text="Apellido Materno" />
              <ListTitle text="Genero" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text="" />
              <ListSubtitle text="" />
              <ListSubtitle text="" />
              <ListSubtitle text="" />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Nacionalidad" />
              <ListTitle text="Correo electronico" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text="" />
              <ListSubtitle text="" />
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ConsultPlantelesForm.propTypes = {
  data: PropTypes.shape({
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
