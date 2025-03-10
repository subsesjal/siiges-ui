import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DatosPrograma from './DatosPrograma';
import DatosPlantel from './DatosPlantel';
import DatosSolicitud from './DatosSolicitud';

export default function SolicitudBecasSection({
  programa, plantel, setReqData, reqData,
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
        reqData={reqData}
      />
    </Grid>
  );
}

SolicitudBecasSection.defaultProps = {
  reqData: {} || null,
};

SolicitudBecasSection.propTypes = {
  setReqData: PropTypes.func.isRequired,
  programa: PropTypes.shape({}).isRequired,
  reqData: PropTypes.shape({}),
  plantel: PropTypes.shape({}).isRequired,
};
