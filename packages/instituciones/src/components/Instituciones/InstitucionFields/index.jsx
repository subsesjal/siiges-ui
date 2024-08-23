import {
  Grid, Typography, Divider,
} from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';

export default function InstitucionFields({
  handleOnChange,
  handleOnBlur,
  institucion,
  setLoading,
  setForm,
  setError,
  errors,
  form,
}) {
  setLoading(false);
  const handleFileLoaded = (index, url) => {
    setForm((prevForm) => {
      const updatedForm = [...prevForm];
      updatedForm[index] = url;
      return updatedForm;
    });
  };
  return (
    <>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Datos Generales
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Input
            label="Nombre de Institución"
            id="nombreInstitucion"
            name="nombreInstitucion"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.nombreInstitucion}
            value={institucion?.nombre}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            label="Razón social"
            id="razonSocial"
            name="razonSocial"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.razonSocial}
            value={institucion?.razonSocial}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            id="historia"
            name="historia"
            label="Histroria de la institución"
            required
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.historia}
            value={institucion?.historia}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            id="vision"
            name="vision"
            label="Visión"
            required
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.vision}
            value={institucion?.vision}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            id="mision"
            name="mision"
            label="Misión"
            required
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.mision}
            value={institucion?.mision}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            id="valoresInstitucionales"
            name="valoresInstitucionales"
            label="Valores Institucionales"
            required
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.valoresInstitucionales}
            value={institucion?.valoresInstitucionales}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" xs={11} sx={{ mt: 5 }}>
        Datos del Rector
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Input
            label="Nombre(s)"
            id="nombreRector"
            name="nombreRector"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.nombreRector}
            value={institucion?.rector?.persona?.nombre}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Primer Apellido"
            id="apellidoPaterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.apellidoPaterno}
            value={institucion?.rector?.persona?.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Segundo Apellido"
            id="apellidoMaterno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.apellidoMaterno}
            value={institucion?.rector?.persona?.apellidoMaterno}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Celular"
            id="celular"
            name="celular"
            auto="celular"
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onBlur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.celular}
            value={institucion?.rector?.persona?.celular}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Teléfono"
            id="telefono"
            name="telefono"
            auto="telefono"
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onBlur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.telefono}
            value={institucion?.rector?.persona?.telefono}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="CURP"
            id="curp"
            name="curp"
            auto="curp"
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.curp}
            value={institucion?.rector?.persona?.curp}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Correo electrónico"
            id="correoPrimario"
            name="correoPrimario"
            auto="correoPrimario"
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.correoPrimario}
            value={institucion?.rector?.persona?.correoPrimario}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" xs={11} sx={{ mt: 5 }}>
        Ratificación de Nombre
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Input
            label="Nombre propuesto 1"
            id="nombrePropuesto1"
            name="nombrePropuesto1"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.nombrePropuesto1}
            value={institucion?.ratificacionesNombre[0]?.nombrePropuesto1}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            label="Nombre propuesto 2"
            id="nombrePropuesto2"
            name="nombrePropuesto2"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.nombrePropuesto2}
            value={institucion?.ratificacionesNombre[0]?.nombrePropuesto2}
          />
        </Grid>
        <Grid item xs={11}>
          <Input
            label="Nombre propuesto 3"
            id="nombrePropuesto3"
            name="nombrePropuesto3"
            required
            onchange={(e) => handleOnChange(e, { form, setForm })}
            onblur={(e) => handleOnBlur(e, { form, setError })}
            errorMessage={errors.nombrePropuesto3}
            value={institucion?.ratificacionesNombre[0]?.nombrePropuesto3}
          />
        </Grid>
        <Grid item xs={11}>
          <InputFile
            label="Biografía o Fundamento"
            tipoEntidad="RATIFICACION"
            tipoDocumento="BIOGRAFIA"
            id
            url
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled
          />
        </Grid>
        <Grid item xs={11}>
          <InputFile
            label="Bibliografía para fuente de consulta"
            tipoEntidad="RATIFICACION"
            tipoDocumento="BIBLIOGRAFIA"
            id
            url
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
}

InstitucionFields.defaultProps = {
  institucion: {} || null,
};

InstitucionFields.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  form: PropTypes.shape({
    nombreInstitucion: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    nombrePropuesto1: PropTypes.string,
    nombrePropuesto2: PropTypes.string,
    nombrePropuesto3: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    nombreInstitucion: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    celular: PropTypes.string,
    telefono: PropTypes.string,
    curp: PropTypes.string,
    correoPrimario: PropTypes.string,
    nombreRector: PropTypes.string,
    nombrePropuesto1: PropTypes.string,
    nombrePropuesto2: PropTypes.string,
    nombrePropuesto3: PropTypes.string,
  }).isRequired,
  institucion: PropTypes.shape({
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    rector: PropTypes.shape({
      persona: PropTypes.shape({
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
        celular: PropTypes.string,
        telefono: PropTypes.string,
        curp: PropTypes.string,
        correoPrimario: PropTypes.string,
      }),
    }),
    ratificacionesNombre: PropTypes.arrayOf(
      PropTypes.shape({
        nombrePropuesto1: PropTypes.string,
        nombrePropuesto2: PropTypes.string,
        nombrePropuesto3: PropTypes.string,
        esNombreAutorizado: PropTypes.bool,
      }),
    ),
  }),
};
