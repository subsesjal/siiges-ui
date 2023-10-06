import { Grid, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function AnexosSeccion({
  disabled, form, setForm, id,
}) {
  const handleFileLoaded = (index, url) => {
    setForm((prevForm) => {
      const updatedForm = [...prevForm];
      updatedForm[index] = url;
      return updatedForm;
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Anexos</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputFile
            label="Identificación oficial con fotografía de la persona física, o acta constitutiva de la persona moral y poder de su Representante Legal"
            tipoEntidad="SOLICITUD"
            tipoDocumento="IDENTIFICACION_REPRESENTANTE"
            id={id}
            url={form[0] || ''}
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="COMPROBANTE_PAGO_RVOE"
            id={id}
            url={form[1] || ''}
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled={disabled}
            label="Comprobante de pago"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="FOTOGRAFIA_INMUEBLE"
            id={id}
            url={form[2] || ''}
            setUrl={(url) => handleFileLoaded(2, url)}
            disabled={disabled}
            label="Fotografías inmuebles"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="CONSTANCIA_INFEJAL"
            id={id}
            url={form[3] || ''}
            setUrl={(url) => handleFileLoaded(3, url)}
            disabled={disabled}
            label="Constancia INFEJAL"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="LICENCIA_MUNICIPAL"
            id={id}
            url={form[4] || ''}
            setUrl={(url) => handleFileLoaded(4, url)}
            disabled={disabled}
            label="Licencia municipal"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="DICTAMEN_IMPI"
            id={id}
            url={form[5] || ''}
            setUrl={(url) => handleFileLoaded(5, url)}
            disabled={disabled}
            label="Dictamen del Instituto Mexicano de Propiedad Intelectual (IMPI)"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="SECRETARIA_SALUD"
            id={id}
            url={form[6] || ''}
            setUrl={(url) => handleFileLoaded(6, url)}
            disabled={disabled}
            label="Aviso funcionamiento de Secretaría de Salud ó Carta bajo protesta de decir verdad de NO venta de alimentos."
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="COMPROBANTE_TELEFONO"
            id={id}
            url={form[7] || ''}
            setUrl={(url) => handleFileLoaded(7, url)}
            disabled={disabled}
            label="Comprobante de línea telefónica"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="PROYECTO_VINCULACION"
            id={id}
            url={form[8] || ''}
            setUrl={(url) => handleFileLoaded(8, url)}
            disabled={disabled}
            label="Proyecto de vinculación y movilidad"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="PLAN_MEJORA"
            id={id}
            url={form[9] || ''}
            setUrl={(url) => handleFileLoaded(9, url)}
            disabled={disabled}
            label="Plan de mejora"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="FORMA_MIGRATORIA"
            id={id}
            url={form[10] || ''}
            setUrl={(url) => handleFileLoaded(10, url)}
            disabled={disabled}
            label="Formas de migratorias de los profesores"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="PROGRAMA_SUPERACION"
            id={id}
            url={form[11] || ''}
            setUrl={(url) => handleFileLoaded(11, url)}
            disabled={disabled}
            label="Programa de superación"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

AnexosSeccion.defaultProps = {
  form: [],
};

AnexosSeccion.propTypes = {
  disabled: PropTypes.bool.isRequired,
  setForm: PropTypes.func.isRequired,
  form: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number.isRequired,
};
