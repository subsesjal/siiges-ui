import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
} from '@mui/material';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';

const getRoleLabel = (user) => user?.rol?.descripcion || user?.rol?.nombre || '';

const getStatusLabel = (estatus) => {
  if (String(estatus) === '1') return 'Activado';
  if (String(estatus) === '0') return 'Desactivado';
  return estatus ?? '';
};

export default function UserProfileViewSections({ user }) {
  const persona = user?.persona || {};

  return (
    <Grid item xs={12} md={9}>
      <Stack spacing={3} sx={{ paddingTop: 1 }}>
        {/* Datos de contacto */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Datos de contacto
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs>
                  <List>
                    <ListTitle text="Nombre" />
                    <ListTitle text="Primer apellido" />
                    <ListTitle text="Segundo apellido" />
                    <ListTitle text="Género" />
                    <ListTitle text="Nacionalidad" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs>
                  <List>
                    <ListSubtitle text={persona.nombre || ''} />
                    <ListSubtitle text={persona.apellidoPaterno || ''} />
                    <ListSubtitle text={persona.apellidoMaterno || ''} />
                    <ListSubtitle text={persona.sexo || ''} />
                    <ListSubtitle text={persona.nacionalidad || ''} />
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs>
                  <List>
                    <ListTitle text="RFC" />
                    <ListTitle text="CURP" />
                    <ListTitle text="Correo electrónico" />
                    <ListTitle text="Celular" />
                    <ListTitle text="Teléfono" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs>
                  <List>
                    <ListSubtitle text={persona.rfc || ''} />
                    <ListSubtitle text={persona.curp || ''} />
                    <ListSubtitle text={user?.correo || ''} />
                    <ListSubtitle text={persona.celular || ''} />
                    <ListSubtitle text={persona.telefono || ''} />
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Datos del usuario */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Datos del usuario
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs>
                  <List>
                    <ListTitle text="Usuario" />
                    <ListTitle text="Rol" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs>
                  <List>
                    <ListSubtitle text={user?.usuario || ''} />
                    <ListSubtitle text={getRoleLabel(user)} />
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs>
                  <List>
                    <ListTitle text="Cargo" />
                    <ListTitle text="Estatus del usuario" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs>
                  <List>
                    <ListSubtitle text={persona.tituloCargo || ''} />
                    <ListSubtitle text={getStatusLabel(user?.estatus)} />
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Grid>
  );
}

UserProfileViewSections.propTypes = {
  user: PropTypes.shape({
    usuario: PropTypes.string,
    correo: PropTypes.string,
    estatus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rol: PropTypes.shape({
      nombre: PropTypes.string,
      descripcion: PropTypes.string,
    }),
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      sexo: PropTypes.string,
      nacionalidad: PropTypes.string,
      rfc: PropTypes.string,
      curp: PropTypes.string,
      celular: PropTypes.string,
      telefono: PropTypes.string,
      tituloCargo: PropTypes.string,
    }),
  }),
};

UserProfileViewSections.defaultProps = {
  user: null,
};
