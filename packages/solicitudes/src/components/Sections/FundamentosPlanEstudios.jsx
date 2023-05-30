import { Grid, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SolicitudContext from '../utils/Context/solicitudContext';

export default function FundamentosPlanEstudios({ disabled }) {
  const [loaded, setLoaded] = useState(false);
  const { form, setForm, id } = useContext(SolicitudContext);
  const [url, setUrl] = useState();
  useEffect(() => {
    if (url !== undefined) {
      setForm({ ...form, 2: { ...form['2'], url } });
    }
  }, [loaded]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del plan de estudios</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 0, width: '100%' }}>
        <Grid item xs={9}>
          {form[2].url ? <div />
            : (
              <InputFile
                tipoEntidad="SOLICITUD"
                tipoDocumento="FORMATO_PEDAGOGICO_01"
                id={id}
                label="FDP01"
                setLoaded={setLoaded}
                setUrl={setUrl}
                disabled={disabled}
              />
            )}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            ¡Nota importante!
            <br />
            Adjuntar archivo que describa el estudio de pertinencia y
            factibilidad así como el estudio de oferta y demanda con las
            especificaciones señaladas en el Instructivo para la Obtención del
            Reconocimiento de Validez Oficial de Estudios de Educación Superior
            del Estado de Jalisco. (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

FundamentosPlanEstudios.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
