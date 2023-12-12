import { Grid, TextField } from '@mui/material';
import { ButtonsForm, Input, InputFile } from '@siiges-ui/shared';
import React, { useState } from 'react';

export default function PlanMaestro() {
  const [fileURLs, setFileURLs] = useState([]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Input id="nombre" label="Nombre" name="nombre" auto="nombre" />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="fuenteFinanciamiento"
          label="Fuente de Financiamiento"
          name="fuenteFinanciamiento"
          auto="fuenteFinanciamiento"
        />
      </Grid>
      <Grid item xs={3}>
        <Input id="tipo" label="Tipo" name="tipo" auto="tipo" />
      </Grid>
      <Grid item xs={3}>
        <Input id="monto" label="Monto" name="monto" auto="monto" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="ejercicio"
          label="Ejercicio"
          name="ejercicio"
          auto="ejercicio"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="porcentajeEjecucion"
          label="Porcentaje de ejecución"
          name="porcentajeEjecucion"
          auto="porcentajeEjecucion"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="remanente"
          label="Remanente"
          name="remanente"
          auto="remanente"
        />
      </Grid>
      <Grid item xs={3}>
        <Input id="periodo" label="Periodo" name="periodo" auto="periodo" />
      </Grid>
      <Grid item xs={3}>
        <Input id="acuerdo" label="Acuerdo" name="acuerdo" auto="acuerdo" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="observaciones"
          name="observaciones"
          label="Observaciones"
          rows={4}
          multiline
          sx={{ width: '100%' }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <InputFile
          tipoEntidad="FORTALECIMIENTO"
          tipoDocumento="EVIDENCIA_FOTOGRAFICA"
          id={1}
          label="Evidencia Fotografica (.jpg)"
          url={fileURLs[0]}
          setUrl={(url) => handleFileLoaded(0, url)}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFile
          tipoEntidad="FORTALECIMIENTO"
          tipoDocumento="EVIDENCIA_FOTOGRAFICA"
          id={1}
          label="Evidencia Fotografica (.jpg)"
          url={fileURLs[0]}
          setUrl={(url) => handleFileLoaded(1, url)}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonsForm />
      </Grid>
    </Grid>
  );
}
