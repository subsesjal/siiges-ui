import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DatosPrograma from './DatosPrograma';
import DatosPlantel from './DatosPlantel';
import DatosResponsable from './DatosResponsable';
import DatosSolicitud from './DatosSolicitud';

export default function SolicitudBecasSection({
  usuario, programa, plantel, setReqData, formData, disabled,
}) {
  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <DatosPrograma
        programa={programa}
      />
      <DatosPlantel
        plantel={plantel}
      />
      <DatosResponsable
        usuario={usuario}
      />
      <DatosSolicitud
        programa={programa}
        setReqData={setReqData}
        formData={formData}
        disabled={disabled}
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
  usuario: PropTypes.shape({}).isRequired,
  formData: PropTypes.shape({}),
  plantel: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
};
