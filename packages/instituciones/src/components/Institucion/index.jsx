import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { ButtonStyled } from '@siiges-ui/shared';

export default function Institucion() {
  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
        <Image
          alt="logoschool"
          src="/logoschool.png"
          quality={100}
          width="300px"
          height="300px"
          style={{
            zIndex: 1,
            overflow: 'hidden',
          }}
        />
        <br />
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <ButtonStyled text="Acta constitutiva" alt="Consultar acta" />
        </Box>
      </Grid>
      <Grid item xs={8} sx={{ marginTop: 3 }}>
        <Grid container>
          <Grid item xs={4}>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Nombre de institucion" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Razon social" />
              </ListItem>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs={2}>
            <List>
              <ListItem disablePadding>
                <ListItemText secondary="Escuela XYZ" sx={{ mt: 1 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText secondary="EXYZ" sx={{ mt: 1 }} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5, mb: 2 }} />
        <Typography variant="p" sx={{ fontWeight: 'medium' }}>
          Historia de la institucion
        </Typography>
        <br />
        <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 15 }}>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </div>
        <Divider />
        <Typography variant="p" sx={{ fontWeight: 'medium' }}>
          Vision
        </Typography>
        <br />
        <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 15 }}>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </div>
        <Divider />
        <Typography variant="p" sx={{ fontWeight: 'medium' }}>
          Mision
        </Typography>
        <br />
        <div style={{ marginLeft: 100, marginTop: 15 }}>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
