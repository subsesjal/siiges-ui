import { Grid } from '@mui/material';
import { ButtonFileDownload } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function ConsultDocumentos({ id }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="ARCHIVO_CURP"
        >
          CURP
        </ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="IDENTIFICACION_OFICIAL"
        >
          Identificación Oficial
        </ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="ARCHIVO_NACIMIENTO"
        >
          Acta de Nacimiento
        </ButtonFileDownload>
      </Grid>
      {/* <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="RESOLUCION"
        >
          Copia de Resolución
        </ButtonFileDownload>
      </Grid> */}
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="ARCHIVO_CERTIFICADO"
        >
          Certificado Parcial/Total
        </ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="ANTECEDENTE_ACADEMICO"
        >
          Antecedente Académico
        </ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="PROGRAMA_AUTORIZADO"
        >
          Programa de Estudio Autorizado
        </ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="PROPUESTA"
        >
          Propuesta de Equivalencia
        </ButtonFileDownload>
      </Grid>
      <Grid item xs={6}>
        <ButtonFileDownload
          entidadId={id}
          tipoEntidad="SOLICITUD_REV_EQUIV"
          tipoDocumento="COMPROBANTE_PAGO_TRAMITE"
        >
          Pago de Equivalencia
        </ButtonFileDownload>
      </Grid>
    </Grid>
  );
}

ConsultDocumentos.propTypes = {
  id: PropTypes.number.isRequired,
};
