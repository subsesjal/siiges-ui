import { Grid } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React, { useState } from 'react';

export default function CargaMaterias() {
  const [url, setUrl] = useState();
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <InputFile
          label="CURP"
          id={1}
          tipoDocumento="CURP"
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
          label="Copia de Resolución"
          id={1}
          tipoDocumento="COPIA_RESOLUCION"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Certificado Parcial/Total"
          id={1}
          tipoDocumento="CERTIFICADO_PARCIAL_TOTAL"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Antecedente Academico"
          id={1}
          tipoDocumento="ANTECEDENTE_ACADEMICO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Programa de Estudio Autorizado"
          id={1}
          tipoDocumento="PROGRAMA_ESTUDIO_AUTORIZADO"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Propuesta de Equivalencia"
          id={1}
          tipoDocumento="PROPUESTA_EQUIVALENCIA"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Pago de Equivalencia"
          id={1}
          tipoDocumento="PAGO_EQUIVALENCIA"
          tipoEntidad="EQUIVALENCIAS"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
    </Grid>
  );
}
