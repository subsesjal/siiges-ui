import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Grid } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Context, GetFile } from '@siiges-ui/shared';

const baseUrl = process.env.NEXT_PUBLIC_URL;

const placeholderPdfFiles = [
  { title: 'FDP01' },
  { title: 'FDP02' },
  { title: 'FDP03' },
  { title: 'FDP04' },
  { title: 'FDP05' },
  { title: 'FDP06' },
  { title: 'FDA01' },
  { title: 'FDA02' },
  { title: 'FDA03' },
  { title: 'FDA04' },
  { title: 'FDA05' },
  { title: 'FDA06' },
];

export default function ProgramasPDF({ id: entidadId }) {
  const { setNoti, setLoading } = useContext(Context);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const tipoEntidad = 'SOLICITUD';

  const handleDownload = (tipoDocumento) => {
    setLoading(true);
    GetFile(
      {
        entidadId,
        tipoDocumento,
        tipoEntidad,
      },
      (result, error) => {
        if (error) {
          setNoti({
            open: true,
            message: `No se encontró el archivo: ${error}`,
            type: 'error',
          });
        } else {
          const fileUrl = `${baseUrl}${result}`;
          window.open(fileUrl, '_blank');
        }
        setLoading(false);
      },
    );
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      {placeholderPdfFiles.map((pdf, index) => (
        <Grid item xs={6} key={pdf.title}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={(
              <DescriptionIcon
                style={{ color: hoveredIndex === index ? 'white' : 'black' }}
              />
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleDownload(pdf.title)}
            sx={{
              color: 'black',
              borderColor: 'black',
              backgroundColor: 'white',
              width: '100%',
              height: '43px',
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

ProgramasPDF.propTypes = {
  id: PropTypes.string.isRequired,
};
