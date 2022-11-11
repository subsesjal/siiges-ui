import React from 'react';
import { Grid, List, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';

export default function UserConsult({ user }) {
  const { persona, rol } = user.data;
  return (
    <Grid item xs={8}>
      <Typography variant="h5" gutterBottom component="div">
        Información Personal
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Nombre(s)" />
              <ListTitle text="Apellidos" />
              <ListTitle text="Correo electronico" />
              <ListTitle text="Nacionalidad" />
              <ListTitle text="Sexo" />
              <ListTitle text="Telefono" />
              <ListTitle text="Celular" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={persona.nombre} />
              <ListSubtitle
                text={`${persona.apellidoPaterno} ${persona.apellidoMaterno}`}
              />
              <ListSubtitle text={user.data.correo} />
              <ListSubtitle text={persona.nacionalidad} />
              <ListSubtitle text={persona.sexo} />
              <ListSubtitle text={persona.telefono} />
              <ListSubtitle text={persona.celular} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={5}>
          <Grid item xs>
            <List>
              <ListTitle text="Rol" />
              <ListTitle text="Cargo" />
              <ListTitle text="INE" />
              <ListTitle text="RFC" />
              <ListTitle text="Curp" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={rol.descripcion} />
              <ListSubtitle text="Jefe de jefes" />
              <ListSubtitle text={persona.ine} />
              <ListSubtitle text={persona.rfc} />
              <ListSubtitle text={persona.curp} />
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

UserConsult.propTypes = {
  user: PropTypes.objectOf.isRequired,
};
