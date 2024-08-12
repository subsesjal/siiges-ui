import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const placeholderPdfFiles = [
  { title: 'FDP01' },
  { title: 'Mapa Curricular' },
  { title: 'Reglas de operación' },
  { title: 'Asignaturas a detalle' },
  { title: 'Propuesta hemerobibliografíca' },
  { title: 'Informe de resultados' },
  { title: 'Instrumentos o formatos utilizados' },
  { title: 'Trayectoria Educativa' },
];

export default function ProgramasPDF() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      {placeholderPdfFiles.map((pdf, index) => (
        <Grid item xs={6} key={index}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <DescriptionIcon
                style={{ color: hoveredIndex === index ? 'white' : 'black' }}
              />
            }
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            sx={{
              color: 'black',
              borderColor: 'black',
              backgroundColor: 'white',
              width: '100%',
              height: '46px',
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
              },
            }}
          >
            <Typography variant="body1">{pdf.title}</Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
