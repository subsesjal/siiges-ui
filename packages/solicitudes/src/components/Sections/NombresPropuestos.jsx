import { Grid, Typography } from '@mui/material';
import { GetFile, Input, InputFile } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlantelContext from '../utils/Context/plantelContext';
import formDatosSolicitud from '../utils/sections/forms/formDatosSolicitud';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function NombresPropuestos({ disabled, id, institucion }) {
  const { form, setForm, setValidNombres } = useContext(PlantelContext);
  const [fileURLs, setFileURLs] = useState([null, null]);

  const isSectionDisabled = useSectionDisabled(19);

  const isDisabled = disabled || isSectionDisabled;

  const fileData = ['BIOGRAFIA', 'BIBLIOGRAFIA'].map((tipoDocumento) => ({
    entidadId: id,
    tipoEntidad: 'INSTITUCION',
    tipoDocumento,
  }));

  useEffect(() => {
    fileData.forEach((fileInfo, index) => {
      GetFile(fileInfo, (url, err) => {
        if (!err) {
          setFileURLs((currentURLs) => {
            const updatedURLs = [...currentURLs];
            updatedURLs[index] = url;
            return updatedURLs;
          });
        }
      });
    });
  }, [institucion]);

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
      form[6]?.nombrePropuesto1,
      form[6]?.nombrePropuesto2,
      form[6]?.nombrePropuesto3,
    ];
    const isNombrePropuestoValid = nombrePropuestos.some(
      (nombre) => nombre !== null && nombre !== '',
    );

    setValidNombres(isNombrePropuestoValid);
  }, [form, fileURLs, setValidNombres]);

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
            label="Nombre propuesto 1"
            name="nombrePropuesto1"
            auto="nombrePropuesto1"
            value={institucion?.ratificacionesNombre?.[0]?.nombrePropuesto1 || ''}
            onChange={handleOnChange}
            required
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="nombrePropuesto2"
            label="Nombre propuesto 2"
            name="nombrePropuesto2"
            auto="nombrePropuesto2"
            value={institucion?.ratificacionesNombre?.[0]?.nombrePropuesto2 || ''}
            onChange={handleOnChange}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="nombrePropuesto3"
            label="Nombre propuesto 3"
            name="nombrePropuesto3"
            auto="nombrePropuesto3"
            value={institucion?.ratificacionesNombre?.[0]?.nombrePropuesto3 || ''}
            onChange={handleOnChange}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="INSTITUCION"
            tipoDocumento="BIOGRAFIA"
            id={id}
            label="Biografía o Fundamento"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="INSTITUCION"
            tipoDocumento="BIBLIOGRAFIA"
            id={id}
            label="Bibliografía para fuente de consulta"
            url={fileURLs[1]}
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            *Nombre de personas físicas: Se deberá anexar la biografía o
            fundamento por el que se hace la propuesta de nombre. En su caso, se
            anexará la biografía que sirva de fuente de consulta (autor, título
            de la obra, lugar y fecha de edición).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

NombresPropuestos.defaultProps = {
  institucion: {
    ratificacionesNombre: [
      {
        nombrePropuesto1: '',
        nombrePropuesto2: '',
        nombrePropuesto3: '',
      },
    ],
  },
};

NombresPropuestos.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  institucion: PropTypes.shape({
    ratificacionesNombre: PropTypes.arrayOf(
      PropTypes.shape({
        nombrePropuesto1: PropTypes.string,
        nombrePropuesto2: PropTypes.string,
        nombrePropuesto3: PropTypes.string,
      }),
    ),
  }),
};
