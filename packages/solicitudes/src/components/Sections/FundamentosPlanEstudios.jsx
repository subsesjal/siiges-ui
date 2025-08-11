import { Grid, Typography } from '@mui/material';
import { GetFile, InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SolicitudContext from '../utils/Context/solicitudContext';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function FundamentosPlanEstudios({ disabled, type }) {
  const { form, setForm, programaId } = useContext(SolicitudContext);
  const [url, setUrl] = useState();
  const fileData = {
    entidadId: programaId,
    tipoEntidad: 'PROGRAMA',
    tipoDocumento: 'FORMATO_PEDAGOGICO_01',
  };

  const isSectionDisabled = useSectionDisabled(2);

  const isDisabled = disabled || isSectionDisabled;

  useEffect(() => {
    if (type === 'editar' || type === 'consultar') {
      GetFile(fileData, setUrl);
    }
  }, []);

  useEffect(() => {
    if (url !== undefined) {
      setForm({ ...form, 2: { ...form['2'], url } });
    }
  }, [url]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Fundamentos del plan de estudios</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 0, width: '100%' }}>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="FORMATO_PEDAGOGICO_01"
            id={programaId}
            label="FDP01"
            setLoaded={() => {}}
            url={url}
            setUrl={setUrl}
            disabled={isDisabled}
          />
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

FundamentosPlanEstudios.defaultProps = {
  type: null,
};

FundamentosPlanEstudios.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
