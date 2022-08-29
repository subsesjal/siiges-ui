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
                <ListItemText
                  primary="Correo electronico"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary="Nacionalidad"
                  sx={{ textAlign: 'right' }}
                />
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
                <ListItemText secondary="Luis Manuel" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="de Alba Villaseñor" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="example@gmail.com" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="Mexicana" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="Masculino" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="33777666" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="33777666" sx={{ mt: 1 }} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container xs={5}>
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
                <ListItemText secondary="Admin" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="Jefe de jefes" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="AAAAAAAAAAA" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="AAAAAAAAAAA" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="AAAAAAAAAAA" sx={{ mt: 1 }} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
