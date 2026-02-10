import { Grid } from '@mui/material';
import { ButtonFileDownload } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

const DOCUMENTOS = [
  { label: 'Acta de Nacimiento', tipo: 'ACTA_NACIMIENTO' },
  { label: 'Identificación Oficial', tipo: 'IDENTIFICACION_OFICIAL' },
  { label: 'Título, diploma o grado académico', tipo: 'TITULO_DIPLOMA_GRADOACADEMICO' },
  { label: 'Certificado / Notas', tipo: 'CERTIFICADO_NOTAS' },
  { label: 'Plan y programa de estudio / Pensum', tipo: 'PLAN_PROGRAMAESTUDIO_PENSUM' },
  { label: 'Cédula profesional', tipo: 'CEDULA_PROFESIONAL' },
  { label: 'Antecedente académico revalidado', tipo: 'ANTECEDENTE_ACADEMICO_REVALIDADO' },
  { label: 'Comprobante de pago', tipo: 'COMPROBANTE_PAGO' },
  { label: 'Traducción al español', tipo: 'TRADUCCION_ESPANOL' },
  { label: 'Folio de pago', tipo: 'FOLIO_PAGO' },
];

export default function ConsultDocumentos({ id }) {
  return (
    <Grid container spacing={1}>
      {DOCUMENTOS.map(({ label, tipo }) => (
        <Grid item xs={6} key={tipo}>
          <ButtonFileDownload
            entidadId={id}
            tipoEntidad="SOLICITUD_REV_EQUIV"
            tipoDocumento={tipo}
          >
            {label}
          </ButtonFileDownload>
        </Grid>
      ))}
    </Grid>
  );
}

ConsultDocumentos.propTypes = {
  id: PropTypes.number.isRequired,
};
