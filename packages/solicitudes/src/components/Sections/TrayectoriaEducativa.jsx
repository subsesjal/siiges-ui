import { Grid, TextField, Typography } from '@mui/material';
import { GetFile, InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SolicitudContext from '../utils/Context/solicitudContext';
import errorTrayectoriaEducativa from '../utils/sections/errors/errorTrayectoriaEducativa';
import formtrayectoria from '../utils/sections/forms/formTrayectoria';
import useTrayectoriasEducativas from '../utils/getTrayectoriasEducativas';

export default function TrayectoriaEducativa({ disabled, type }) {
  const [initialValues, setInitialValues] = useState({});
  const [fileURLs, setFileURLs] = useState([null, null, null, null]);
  const {
    form, setForm, error, setError, id, programaId, setTrayectoriaStatus,
  } = useContext(SolicitudContext);
  const { trayectorias } = useTrayectoriasEducativas(programaId);
  const errors = errorTrayectoriaEducativa(form, setError, error);

  const fileData = [
    'INFORME_RESULTADOS_TRAYECTORIA_EDUCATIVA',
    'INSTRUMENTOS_TRAYECTORIA_EDUCATIVA',
    'TRAYECTORIA_EDUCATIVA',
  ].map((tipoDocumento) => ({
    entidadId: id,
    tipoEntidad: 'TRAYECTORIA',
    tipoDocumento,
  }));

  useEffect(() => {
    if (type === 'editar') {
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
    }

    if (trayectorias.id !== undefined) {
      setTrayectoriaStatus('edit');
      setForm((prevForm) => ({
        ...prevForm,
        9: {
          ...prevForm[9],
          id: trayectorias.id,
          programaId: trayectorias.programaId,
          programaSeguimiento: trayectorias.programaSeguimiento,
          funcionTutorial: trayectorias.funcionTutorial,
          tipoTutoria: trayectorias.tipoTutoria,
          tasaEgreso: trayectorias.tasaEgreso,
          estadisticasTitulacion: trayectorias.estadisticasTitulacion,
          modalidadesTitulacion: trayectorias.modalidadesTitulacion,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        9: {
          ...prevForm[9],
          programaId,
        },
      }));
    }
  }, [programaId, trayectorias]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formtrayectoria(name, value, setForm, 9);
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errors[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Trayectoria educativa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, mt: 2, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="programaSeguimiento"
            name="programaSeguimiento"
            label="Programa de seguimiento"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].programaSeguimiento || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.programaSeguimiento}
            error={!!error.programaSeguimiento}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="funcionTutorial"
            name="funcionTutorial"
            label="Funcion tutorial"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].funcionTutorial || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.funcionTutorial}
            error={!!error.funcionTutorial}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tipoTutoria"
            name="tipoTutoria"
            label="Tipo de tutoría"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].tipoTutoria || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.tipoTutoria}
            error={!!error.tipoTutoria}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tasaEgreso"
            name="tasaEgreso"
            label="Tasa de egreso"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].tasaEgreso || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.tasaEgreso}
            error={!!error.tasaEgreso}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="estadisticasTitulacion"
            name="estadisticasTitulacion"
            label="Estadisticas de titulación"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].estadisticasTitulacion || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.estadisticasTitulacion}
            error={!!error.estadisticasTitulacion}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="modalidadesTitulacion"
            name="modalidadesTitulacion"
            label="Modalidades de titulación"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].modalidadesTitulacion || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.modalidadesTitulacion}
            error={!!error.modalidadesTitulacion}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="TRAYECTORIA"
            tipoDocumento="INFORME_RESULTADOS_TRAYECTORIA_EDUCATIVA"
            id={id}
            label="Informe de resultados"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="TRAYECTORIA"
            tipoDocumento="INSTRUMENTOS_TRAYECTORIA_EDUCATIVA"
            id={id}
            label="Instrumentos o formatos utilizados para dar seguimiento al programa de trayectoria y tutoría académica"
            setUrl={(url) => handleFileLoaded(1, url)}
            url={fileURLs[1]}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="TRAYECTORIA"
            tipoDocumento="TRAYECTORIA_EDUCATIVA"
            id={id}
            label="Trayectoria educativa y tutoría de los estudiantes (opcional)"
            url={fileURLs[2]}
            setUrl={(url) => handleFileLoaded(2, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            1. Incluir el acta de creación del comité tutorial
            <br />
            2. En caso de que los campos programa seguimiento, función tutorial,
            tipo tutoría, tasa egreso, estadísticas de titulación y modalidades
            de titulación incluyan cualquier tipo de ilustración o el texto sea
            demasiado incluya un resumen en los campos y suba su archivo
            completo tomando como referencia (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

TrayectoriaEducativa.defaultProps = {
  type: null,
};

TrayectoriaEducativa.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
