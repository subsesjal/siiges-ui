import { Grid, Typography } from '@mui/material';
import { GetFile, InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SolicitudContext from '../utils/Context/solicitudContext';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function HerramientaEducativa({ disabled, type }) {
  const { form, setForm, id } = useContext(SolicitudContext);
  const [url, setUrl] = useState();
  const fileData = {
    entidadId: id,
    tipoEntidad: 'PROGRAMA',
    tipoDocumento: 'FORMATO_PEDAGOGICO_01',
  };

  const isSectionDisabled = useSectionDisabled(2);

  const isDisabled = disabled || isSectionDisabled;

  useEffect(() => {
    if (type === 'editar') {
      GetFile(fileData, setUrl);
    }
  }, []);

  useEffect(() => {
    if (url !== undefined) {
      setForm({ ...form, 10: { ...form['10'], url } });
    }
  }, [url]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Plataforma Educativa Tecnológica</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 0, width: '100%' }}>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="FORMATO_PEDAGOGICO_01"
            id={id}
            label="Herramienta Educativa"
            setLoaded={() => {}}
            url={url}
            setUrl={setUrl}
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

HerramientaEducativa.defaultProps = {
  type: null,
};

HerramientaEducativa.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
