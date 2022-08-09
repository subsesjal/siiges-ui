import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';

export default function UserConsult() {
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
              <ListItem disablePadding>
                <ListItemText primary="Nombre(s)" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Apellidos" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Correo electronico" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Nacionalidad" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Sexo" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Telefono" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Celular" sx={{ textAlign: 'right' }} />
              </ListItem>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Luis Manuel" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="de Alba Villaseñor" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="example@gmail.com" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Mexicana" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Masculino" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="33777666" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="33777666" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Rol" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Cargo" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="INE" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="RFC" sx={{ textAlign: 'right' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Curp" sx={{ textAlign: 'right' }} />
              </ListItem>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Admin" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Jefe de jefes" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="AAAAAAAAAAA" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="AAAAAAAAAAA" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="AAAAAAAAAAA" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
