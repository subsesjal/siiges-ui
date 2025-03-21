import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DatosPrograma from '../../../Becas/SolicitudesBecasBox/SolicitudBecasSection/DatosPrograma';
import DatosPlantel from '../../../Becas/SolicitudesBecasBox/SolicitudBecasSection/DatosPlantel';
import DatosSolicitud from './DatosSolicitud';

export default function SolicitudesServSocSection({
  programa, plantel, setReqData, formData, disabled,
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
        disabled={disabled}
      />
    </Grid>
  );
}

SolicitudesServSocSection.defaultProps = {
  formData: {} || null,
};

SolicitudesServSocSection.propTypes = {
  setReqData: PropTypes.func.isRequired,
  programa: PropTypes.shape({}).isRequired,
  formData: PropTypes.shape({}),
  plantel: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
};
