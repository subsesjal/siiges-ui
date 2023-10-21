import { Grid, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React, { useState } from 'react';

export default function DocumentosAlumno() {
  const [fileURLs, setFileURLs] = useState([]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index), url, ...prevURLs.slice(index + 1),
    ]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="body1">
        ¡Nota importante! Los documentos que se adjunten tendran que ser
        escaneados a color, con buena resolución y cuidando de que no se pierda
        u omita información.
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="MAPA_CURRICULAR"
            id={1}
            label="Archivo Cédula Profesional, Titulo o equivalente (PDF)"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(0, url)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="MAPA_CURRICULAR"
            id={1}
            label="Archivo Acta de Nacimiento (PDF)"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(1, url)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="MAPA_CURRICULAR"
            id={1}
            label="Archivo CURP (PDF)"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(2, url)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
