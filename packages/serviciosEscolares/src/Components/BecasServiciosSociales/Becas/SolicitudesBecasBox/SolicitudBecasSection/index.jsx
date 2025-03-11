import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DatosPrograma from './DatosPrograma';
import DatosPlantel from './DatosPlantel';
import DatosSolicitud from './DatosSolicitud';

export default function SolicitudBecasSection({
  programa, plantel, setReqData, formData,
}) {
  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <DatosPrograma
        programa={programa}
      />
      <DatosPlantel
        plantel={plantel}
      />
      <DatosSolicitud
        programa={programa}
        setReqData={setReqData}
        formData={formData}
      />
    </Grid>
  );
}

SolicitudBecasSection.defaultProps = {
  formData: {} || null,
};

SolicitudBecasSection.propTypes = {
  setReqData: PropTypes.func.isRequired,
  programa: PropTypes.shape({}).isRequired,
  formData: PropTypes.shape({}),
  plantel: PropTypes.shape({}).isRequired,
};
