import { Grid } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React, { useState } from 'react';

export default function CargaMaterias() {
  const [url, setUrl] = useState();
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <InputFile
          label="Acta de Nacimiento"
          id={1}
          tipoDocumento="ACTA_NACIMIENTO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Identificación Oficial"
          id={1}
          tipoDocumento="IDENTIFICACION_OFICIAL"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Titulo, diploma o grado académico"
          id={1}
          tipoDocumento="TITULO_DIPLOMA_GRADOACADEMICO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Certificado / Notas"
          id={1}
          tipoDocumento="CERTIFICADO_NOTAS"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Plan y programa de estudio/Pensum"
          id={1}
          tipoDocumento="PLAN_PROGRAMAESTUDIO_PENSUM"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Cedula profesional"
          id={1}
          tipoDocumento="CEDULA_PROFECIONAL"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Antecedente académico revalidado"
          id={1}
          tipoDocumento="ANTECEDENTE_ACADEMICO_REVALIDADO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Comprobante de pago"
          id={1}
          tipoDocumento="COMPROBANTE_PAGO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Traducción al español"
          id={1}
          tipoDocumento="TRADUCCION_ESPANOL"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Folio de pago"
          id={1}
          tipoDocumento="FOLIO_PAGO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
    </Grid>
  );
}
