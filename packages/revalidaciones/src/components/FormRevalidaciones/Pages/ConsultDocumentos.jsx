import { Grid } from '@mui/material';
import { ButtonFileDownload } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function ConsultDocumentos({ id }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="ACTA_NACIMIENTO">Acta de Nacimiento</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="IDENTIFICACION_OFICIAL">Identificación Oficial</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="TITULO_DIPLOMA_GRADOACADEMICO">Titulo, diploma o grado académico</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="CERTIFICADO_NOTAS">Certificado / Notas</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="PLAN_PROGRAMAESTUDIO_PENSUM">Plan y programa de estudio/Pensum</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="CEDULA_PROFESIONAL">Cédula profesional</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="ANTECEDENTE_ACADEMICO_REVALIDADO">Antecedente académico revalidado</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="COMPROBANTE_PAGO">Comprobante de pago</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="TRADUCCION_ESPANOL">Traducción al español</ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload entidadId={id} tipoEntidad="REVALIDACIONES" tipoDocumento="FOLIO_PAGO">Folio de pago</ButtonFileDownload>
      </Grid>
    </Grid>
  );
}

ConsultDocumentos.propTypes = {
  id: PropTypes.number.isRequired,
};
