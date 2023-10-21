import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProgramasPDF from '../../utils/ProgramasPDF';

export default function ProgramasData() {
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
        'Ejemplo',
        'Ejemplo',
        'Ejemplo de texto extremadamente largo',
        'Ejemplo',
        'Ejemplo',
        'Ejemplo',
      ],
    },
    {
      titles: [
        'Creditos necesarios para concluir el programa',
        'Objetivo General',
        'Objetivo Particular',
        'Fecha en que surte efecto',
        'Duracion del programa',
      ],
      subtitles: [
        'Ejemplo',
        'Ejemplo',
        'Ejemplo de texto extremadamente largo',
        'Ejemplo',
        'Ejemplo',
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
