import {
  Divider, Grid, List, Typography,
} from '@mui/material';
import { Layout, ListSubtitle, ListTitle } from '@siiges-ui/shared';
import React from 'react';
import getPlantel from '../../utils/getPlantel';

export default function consultarPlantel() {
  const { plantel, loading } = getPlantel();
  console.log(plantel);
  return (
    <Layout title="Plantel">
      {loading ? (
        <Grid container spacing={2} sx={{ m: 1 }}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Domicilio
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
                  <ListSubtitle text={plantel.data.domicilio.calle} />
                  <ListSubtitle text={plantel.data.domicilio.numeroInterior} />
                  <ListSubtitle text={plantel.data.domicilio.numeroExterior} />
                  <ListSubtitle text={plantel.data.domicilio.colonia} />
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
                  <ListSubtitle text={plantel.data.domicilio.codigoPostal} />
                  <ListSubtitle text={plantel.data.domicilio.municipio.id} />
                  <ListSubtitle text={plantel.data.domicilio.calle} />
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
                  <ListSubtitle text={plantel.data.correo1} />
                  <ListSubtitle text={plantel.data.correo2} />
                  <ListSubtitle text={plantel.data.correo3} />
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
                  <ListSubtitle text={plantel.data.telefono1} />
                  <ListSubtitle text={plantel.data.telefono2} />
                  <ListSubtitle text={plantel.data.telefono3} />
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
      ) : (
        <div />
      )}
    </Layout>
  );
}
