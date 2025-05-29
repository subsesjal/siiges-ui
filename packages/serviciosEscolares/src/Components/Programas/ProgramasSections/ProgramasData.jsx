import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ProgramasPDF from '../../utils/ProgramasPDF';

export default function ProgramasData({ programa, id }) {
  if (!programa) {
    return <div>Cargando...</div>;
  }
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  const fecha = programa.fechaSurteEfecto ? new Date(programa.fechaSurteEfecto)
    .toLocaleDateString('es', opciones)
    .replace(/ /g, ' ')
    .replace('.', '')
    .replace(/-([a-z])/, (x) => `-${x[1].toUpperCase()}`) : 'N/A';

  const formatTurnos = (turnosArray) => {
    if (!turnosArray || !Array.isArray(turnosArray)) return '';
    return turnosArray
      .map((programaTurno) => programaTurno?.turno?.nombre)
      .filter(Boolean)
      .join(', ');
  };

  const dataSections = [
    {
      titles: [
        'Acuerdo de RVOE',
        'Nivel',
        'Nombre del Programa',
        'Modalidad',
        'Periodo',
        'Turnos',
      ],
      subtitles: [
        programa?.acuerdoRvoe || 'N/A',
        programa?.nivel?.nombre || 'N/A',
        programa?.nombre || 'N/A',
        programa?.modalidad?.nombre || 'N/A',
        programa?.ciclo?.nombre || 'N/A',
        formatTurnos(programa?.programaTurnos) || 'N/A',
      ],
    },
    {
      titles: [
        'Créditos necesarios para concluir el programa',
        'Fecha en que surte efecto',
        'Duración del programa',
      ],
      subtitles: [
        programa?.creditos || 'N/A',
        fecha,
        programa?.duracionPeriodos || 'N/A',
      ],
    },
  ];

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        sx={{ mt: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {dataSections.map((section) => (
          <Grid item xs={12} md={6} key={section.titles.join('-')}>
            {section.titles.map((title, index) => (
              <div style={{ marginBottom: '6px' }} key={title}>
                <Typography
                  variant="h7"
                  style={{ fontWeight: 'bold' }}
                >
                  {title}
                  :
                  {' '}
                  <span style={{ fontWeight: 'normal' }}>
                    {section.subtitles[index]}
                  </span>
                </Typography>
                <br />
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
      <ProgramasPDF id={id} />
    </>
  );
}

ProgramasData.propTypes = {
  id: PropTypes.number.isRequired,
  programa: PropTypes.shape({
    id: PropTypes.number,
    acuerdoRvoe: PropTypes.string,
    nombre: PropTypes.string,
    nivel: PropTypes.string,
    turno: PropTypes.string,
    modalidad: PropTypes.string,
    periodo: PropTypes.string,
    creditos: PropTypes.string,
    objetivoGeneral: PropTypes.string,
    objetivosParticulares: PropTypes.string,
    fechaSurteEfecto: PropTypes.string,
    duracionPeriodos: PropTypes.string,
    programaTurnos: PropTypes.arrayOf([]),
    ciclo: PropTypes.shape({
      nombre: PropTypes.string,
    }),
  }).isRequired,
};
