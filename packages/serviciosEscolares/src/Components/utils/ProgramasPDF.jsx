import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, List, ListItem, ListItemText,
} from '@mui/material';
import { Context, GetFile } from '@siiges-ui/shared';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function ProgramasPDF({ solicitudId, programaId: entidadId }) {
  const { setNoti, setLoading } = useContext(Context);

  const handleDownload = (tipoDocumento) => {
    let tipoEntidad = 'SOLICITUD';
    let finalEntidadId = solicitudId;
    let typeDocument = tipoDocumento;

    if (['FDA05', 'FDP01', 'FDP03', 'FDP04'].includes(tipoDocumento)) {
      tipoEntidad = 'PROGRAMA';
      finalEntidadId = entidadId;
    }

    if (tipoDocumento === 'FDP01') {
      typeDocument = 'FORMATO_PEDAGOGICO_01';
    }
    if (tipoDocumento === 'FDP03') {
      typeDocument = 'ASIGNATURAS_DETALLE';
    }
    if (tipoDocumento === 'FDP04') {
      typeDocument = 'PROPUESTA_HEMEROGRAFICA';
    }

    setLoading(true);
    GetFile(
      {
        entidadId: finalEntidadId,
        tipoDocumento: typeDocument,
        tipoEntidad,
      },
      (result, error) => {
        if (error) {
          setNoti({
            open: true,
            message: `¡No se encontró el archivo!: ${error}`,
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
    <Grid container spacing={4} sx={{ mt: 3 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" color="textSecondary">
          Formatos Administrativos
        </Typography>
        <List component="nav">
          {['FDA01', 'FDA02', 'FDA03', 'FDA04', 'FDA05', 'FDA06'].map((doc) => (
            <ListItem key={doc} button onClick={() => handleDownload(doc)}>
              <ListItemText primary={doc.replace(/(\D+)(\d+)/, '$1 $2')} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" color="textSecondary">
          Formatos Pedagógicos
        </Typography>
        <List component="nav">
          {['FDP01', 'FDP02', 'FDP03', 'FDP04', 'FDP05', 'FDP06'].map((doc) => (
            <ListItem key={doc} button onClick={() => handleDownload(doc)}>
              <ListItemText primary={doc.replace(/(\D+)(\d+)/, '$1 $2')} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

ProgramasPDF.propTypes = {
  solicitudId: PropTypes.number.isRequired,
  programaId: PropTypes.number.isRequired,
};
