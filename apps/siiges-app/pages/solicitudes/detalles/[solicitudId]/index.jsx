import {
  List, ListItem, ListItemText, Grid, Typography,
} from '@mui/material';
import { Context, Layout } from '@siiges-ui/shared';
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { getSolicitudDetalles, generarFDA01 } from '@siiges-ui/solicitudes';

export default function DetallesSolicitud() {
  const { session, setNoti } = useContext(Context);
  const [solicitud, setSolicitud] = useState({});
  const [loading, setLoading] = useState(true);

  getSolicitudDetalles({
    setSolicitud,
    session,
    setNoti,
    setLoading,
  });

  return (
    <Layout title="Detalles de la solicitud" loading={loading}>
      <Typography sx={{ mt: 5 }} variant="h6">Descarga de documentos</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Administrativos
          </Typography>
          <List component="nav">
            <ListItem
              button
              onClick={() => generarFDA01(solicitud)}
            >
              <ListItemText primary="FDA 01" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="FDA 02" />
            </ListItem>
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
            <ListItem button>
              <ListItemText primary="FDA 06" />
            </ListItem>
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
