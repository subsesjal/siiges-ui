import React from 'react';
import {
  Grid, Typography, List,
} from '@mui/material';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import { ListSubtitle, ListTitle } from '@siiges-ui/shared';
import ProgramasPDF from '../../utils/ProgramasPDF';

export default function ProgramasData({ programa }) {
  if (!programa) {
    return <div>Cargando...</div>;
  }

  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };

  const fecha = new Date(programa.fechaSurteEfecto)
    .toLocaleDateString('es', opciones);

  const TURNOS = {
    1: 'Matutino',
    2: 'Vespertino',
    3: 'Nocturno',
    4: 'Mixto',
  };

  const formatTurnos = (turnosArray) => {
    if (!turnosArray || !Array.isArray(turnosArray)) return '';
    return turnosArray
      .map((programaTurno) => TURNOS[programaTurno?.turnoId])
      .filter(Boolean)
      .join(', ');
  };

  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Información del Programa
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Acuerdo de RVOE" />
              <ListTitle text="Nivel" />
              <ListTitle text="Nombre del Programa" />
              <ListTitle text="Modalidad" />
              <ListTitle text="Periodo" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={programa?.acuerdoRvoe || 'N/A'} />
              <ListSubtitle text={programa?.nivel?.descripcion || 'N/A'} />
              <ListSubtitle text={programa?.nombre || 'N/A'} />
              <ListSubtitle text={programa?.modalidad?.nombre || 'N/A'} />
              <ListSubtitle text={programa?.ciclo?.nombre || 'N/A'} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={5}>
          <Grid item xs>
            <List>
              <ListTitle text="Turnos" />
              <ListTitle text="Créditos necesarios" />
              <ListTitle text="Surte efecto" />
              <ListTitle text="Duración del programa" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs={{ mx: 3 }}>
            <List>
              <ListSubtitle text={formatTurnos(programa?.programaTurnos) || 'N/A'} />
              <ListSubtitle text={programa?.creditos || 'N/A'} />
              <ListSubtitle text={fecha} />
              <ListSubtitle text={`${programa?.duracionPeriodos} periodos` || 'N/A'} />
            </List>
          </Grid>
        </Grid>
      </Grid>
      <ProgramasPDF solicitudId={programa?.solicitudId} programaId={programa?.id} />
    </>
  );
}

ProgramasData.propTypes = {
  programa: PropTypes.shape({
    id: PropTypes.number,
    solicitudId: PropTypes.number,
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
    creditos: PropTypes.string,
    fechaSurteEfecto: PropTypes.string,
    duracionPeriodos: PropTypes.string,
    programaTurnos: PropTypes.arrayOf(
      PropTypes.shape({
        turno: PropTypes.shape({
          nombre: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};
