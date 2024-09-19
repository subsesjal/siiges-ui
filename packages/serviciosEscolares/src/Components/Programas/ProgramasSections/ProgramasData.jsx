import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import getSolicitudesById from '@siiges-ui/solicitudes/src/components/utils/getSolicitudesById';
import ProgramasPDF from '../../utils/ProgramasPDF';

export default function ProgramasData() {
  const router = useRouter();
  const { query } = router;
  const { solicitudesProgramas: programa } = getSolicitudesById(query.id);
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  const fecha = new Date(programa.fechaSurteEfecto)
    .toLocaleDateString('es', opciones)
    .replace(/ /g, ' ')
    .replace('.', '')
    .replace(/-([a-z])/, (x) => `-${x[1].toUpperCase()}`);
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
        programa.acuerdoRvoe,
        programa.nivel,
        programa.nombre,
        programa.modalidad,
        programa.periodo,
        programa.turno,
      ],
    },
    {
      titles: [
        'Créditos necesarios para concluir el programa',
        'Fecha en que surte efecto',
        'Duración del programa',
      ],
      subtitles: [
        programa.creditos,
        fecha,
        programa.duracionPeriodos,
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
        {dataSections.map((section, sectionIndex) => (
          <Grid item xs={12} md={6} key={sectionIndex}>
            {section.titles.map((title, index) => (
              <div style={{ marginBottom: '6px' }}>
                <Typography
                  key={index}
                  variant="h7"
                  style={{ fontWeight: 'bold' }}
                >
                  {title}:{' '}
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
      <ProgramasPDF />
    </>
  );
}

ProgramasData.propTypes = {
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
  }).isRequired,
};
