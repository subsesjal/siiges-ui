import {
  List, ListItem, ListItemText, Grid, Typography,
} from '@mui/material';
import { Layout, Title } from '@siiges-ui/shared';
import React from 'react';
import Link from 'next/link';

export default function detallesSolicitudes() {
  return (
    <Layout>
      <Title title="Detalles de la solicitud" />
      <Typography sx={{ mt: 5 }} variant="h6">Descarga de documentos</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Administrativos
          </Typography>
          <List component="nav">
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDA 01" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDA 02" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDA 03" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDA 04" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDA 05" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDA 06" />
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Pedagógicos
          </Typography>
          <List component="nav">
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDP 01" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDP 02" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDP 03" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDP 04" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDP 05" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="FDP 06" />
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            RVOE
          </Typography>
          <List component="nav">
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Acuerdo RVOE" />
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Evaluación
          </Typography>
          <List component="nav">
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Carta de Aceptación" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Carta de Asignación" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Carta de Imparcialidad y confidencialidad" />
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Inspección
          </Typography>
          <List component="nav">
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Orden de Inspección" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Acta de Inspección" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Acta de Cierre" />
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Otros
          </Typography>
          <List component="nav">
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Oficio Admisorio" />
              </ListItem>
            </Link>
            <Link href="/destino-url">
              <ListItem button>
                <ListItemText primary="Desistimiento" />
              </ListItem>
            </Link>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}
