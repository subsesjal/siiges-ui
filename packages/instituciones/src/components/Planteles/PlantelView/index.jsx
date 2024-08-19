import {
  Divider, Grid, List, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';
import React from 'react';

export default function PlantelViewForm({ data }) {
  const { directores, domicilio } = data;
  const director = directores[0]?.persona;
  const tipoInmuebleMap = {
    1: 'Construido',
    2: 'Adaptado',
    3: 'Mixto',
  };
  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Domicilio
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs>
          <List>
            <ListTitle text="Calle" />
            <ListTitle text="Número interior" />
            <ListTitle text="Número exterior" />
            <ListTitle text="Colonia" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={domicilio.calle} />
            <ListSubtitle text={domicilio.numeroInterior} />
            <ListSubtitle text={domicilio.numeroExterior} />
            <ListSubtitle text={domicilio.colonia} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Código Postal" />
            <ListTitle text="Municipio" />
            <ListTitle text="Clave de centro de trabajo" />
            <ListTitle text="Tipo Inmueble" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={domicilio.codigoPostal} />
            <ListSubtitle text={domicilio.municipio.nombre} />
            <ListSubtitle text={data.claveCentroTrabajo} />
            <ListSubtitle text={tipoInmuebleMap[data.tipoInmuebleId] || ''} />
          </List>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Datos Generales
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
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
            <ListSubtitle margin={3.5} text={data.correo1} />
            <ListSubtitle margin={3.5} text={data.correo2} />
            <ListSubtitle margin={3.5} text={data.correo3} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Teléfono 1" />
            <ListTitle text="Teléfono 2" />
            <ListTitle text="Teléfono 3" />
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
        <Grid item xs>
          <List>
            <ListTitle text="Página web" />
            <ListTitle text="Redes sociales" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={data.paginaWeb} />
            <ListSubtitle text={data.redesSociales} />
          </List>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Datos Director
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs>
          <List>
            <ListTitle text="Nombre(s)" />
            <ListTitle text="Primer Apellido" />
            <ListTitle text="Segundo Apellido" />
            <ListTitle text="Género" />
            <ListTitle text="CURP" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={director?.nombre} />
            <ListSubtitle text={director?.apellidoPaterno} />
            <ListSubtitle text={director?.apellidoMaterno} />
            <ListSubtitle text={director?.sexo} />
            <ListSubtitle text={director?.curp} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Nacionalidad" />
            <ListTitle text="Correo electrónico" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={director?.nacionalidad} />
            <ListSubtitle text={director?.correoPrimario} />
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

PlantelViewForm.propTypes = {
  data: PropTypes.shape({
    domicilio: PropTypes.shape({
      id: PropTypes.number,
      calle: PropTypes.string,
      numeroExterior: PropTypes.string,
      numeroInterior: PropTypes.string,
      colonia: PropTypes.string,
      codigoPostal: PropTypes.number,
      municipio: PropTypes.shape({
        nombre: PropTypes.string,
      }),
    }),
    tipoInmuebleId: PropTypes.number,
    correo1: PropTypes.string,
    correo2: PropTypes.string,
    correo3: PropTypes.string,
    telefono1: PropTypes.string,
    telefono2: PropTypes.string,
    telefono3: PropTypes.string,
    paginaWeb: PropTypes.string,
    redesSociales: PropTypes.string,
    claveCentroTrabajo: PropTypes.string,
    directores: PropTypes.arrayOf(
      PropTypes.shape({
        persona: PropTypes.shape({
          id: PropTypes.number,
          nombre: PropTypes.string,
          apellidoPaterno: PropTypes.string,
          apellidoMaterno: PropTypes.string,
          sexo: PropTypes.string,
          nacionalidad: PropTypes.string,
          curp: PropTypes.string,
          correoPrimario: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};
