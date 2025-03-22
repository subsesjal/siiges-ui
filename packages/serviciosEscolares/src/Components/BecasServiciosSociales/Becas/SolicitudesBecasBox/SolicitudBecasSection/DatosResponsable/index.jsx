import {
  Divider, Grid, List, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';
import React from 'react';

export default function DatosResponsable({ usuario }) {
  const { persona = undefined, rol = undefined } = usuario || {};

  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Datos del Responsable
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
            <ListTitle text="Apellidos" />
            <ListTitle text="Rol" />
            <ListTitle text="Cargo" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={persona?.nombre} />
            <ListSubtitle text={`${persona?.apellidoPaterno} ${persona?.apellidoMaterno}`} />
            <ListSubtitle text={rol?.descripcion} />
            <ListSubtitle text={persona?.tituloCargo} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Correo electrónico" />
            <ListTitle text="Celular" />
            <ListTitle text="Teléfono" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={usuario?.correo} />
            <ListSubtitle text={persona?.celular} />
            <ListSubtitle text={persona?.telefono} />
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

DatosResponsable.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.number,
    usuario: PropTypes.string,
    actualizado: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    correo: PropTypes.string,
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      tituloCargo: PropTypes.string,
    }),
    rol: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

DatosResponsable.defaultProps = {
  usuario: {} || undefined,
};
