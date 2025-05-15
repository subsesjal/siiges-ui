import {
  Divider, Grid, List, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';
import React from 'react';

export default function titulacion({ programa }) {
  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Datos del Programa
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs>
          <List>
            <ListTitle text="Acuerdo de RVOE" />
            <ListTitle text="Nivel" />
            <ListTitle text="Nombre del Programa" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={programa.acuerdoRvoe} />
            <ListSubtitle text={programa?.nivel?.descripcion} />
            <ListSubtitle text={programa.nombre} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Modalidad" />
            <ListTitle text="Periodo" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={programa?.modalidad?.nombre} />
            <ListSubtitle text={programa?.ciclo?.nombre} />
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

titulacion.propTypes = {
  programa: PropTypes.shape({
    id: PropTypes.number,
    acuerdoRvoe: PropTypes.string,
    nombre: PropTypes.string,
    nivel: PropTypes.shape({
      descripcion: PropTypes.string,
    }),
    modalidad: PropTypes.shape({
      nombre: PropTypes.string,
    }),
    ciclo: PropTypes.shape({
      nombre: PropTypes.string,
    }),
  }).isRequired,
};
