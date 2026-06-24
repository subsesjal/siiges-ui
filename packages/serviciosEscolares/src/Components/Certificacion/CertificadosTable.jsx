import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import catalogoCertificados from '../../Tables/catalogoCertificadosTable';

export default function CertificadosTable({ certificados }) {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        rows={certificados}
        columns={catalogoCertificados}
        title="Catálogo de Certificados Electrónicos"
      />
    </Grid>
  );
}

CertificadosTable.propTypes = {
  certificados: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      consecutivo: PropTypes.number,
      nombreCompleto: PropTypes.string,
      matricula: PropTypes.string,
      folio: PropTypes.string,
      foja: PropTypes.string,
      libro: PropTypes.string,
      fechaExpedicion: PropTypes.string,
      fechaTerminacion: PropTypes.string,
      folioDocumentoAlumnoId: PropTypes.number,
    }),
  ).isRequired,
};
