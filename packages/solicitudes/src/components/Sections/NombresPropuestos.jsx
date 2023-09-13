import { Grid, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlantelContext from '../utils/Context/plantelContext';
import formDatosSolicitud from '../utils/sections/forms/formDatosSolicitud';

export default function NombresPropuestos({ disabled, id }) {
  const { form, setForm, setValidNombres } = useContext(PlantelContext);
  const [fileURLs, setFileURLs] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formDatosSolicitud(name, value, form, setForm, 6);
  };

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };

  useEffect(() => {
    const nombrePropuestos = [
      form[6].nombrePropuesto1,
      form[6].nombrePropuesto2,
      form[6].nombrePropuesto3,
    ];
    const isNombrePropuestoValid = nombrePropuestos.some(
      (nombre) => nombre !== null,
    );

    const areFilesLoaded = fileURLs.length === 2;

    setValidNombres(isNombrePropuestoValid && areFilesLoaded);
  }, [form, fileURLs]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Nombres propuestos para la institución educativa
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="nombrePropuesto1"
            label="Nombre propuesto"
            name="nombrePropuesto1"
            auto="nombrePropuesto1"
            value={form[6].nombrePropuesto1}
            onchange={handleOnChange}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="nombrePropuesto2"
            label="Nombre propuesto"
            name="nombrePropuesto2"
            auto="nombrePropuesto2"
            value={form[6].nombrePropuesto2}
            onchange={handleOnChange}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="nombrePropuesto3"
            label="Nombre propuesto"
            name="nombrePropuesto3"
            auto="nombrePropuesto3"
            value={form[6].nombrePropuesto3}
            onchange={handleOnChange}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="INSTITUCION"
            tipoDocumento="BIOGRAFIA"
            id={id}
            label="Biografía o Fundamento"
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="INSTITUCION"
            tipoDocumento="BIBLIOGRAFIA"
            id={id}
            label="Bibliografía para fuente de consulta"
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            *Nombre de personas físicas: Se debera anexar la bigrafía o
            fundamento por el que se hace la propuesta de nombre. En su caso, se
            anexará la biografía que sirva de fuente de consulta (autor, título
            de la obra, lugar y fecha de edición).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

NombresPropuestos.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};
