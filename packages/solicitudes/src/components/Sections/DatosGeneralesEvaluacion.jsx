import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import {
  GetFile,
  Input,
  InputDateTime,
  InputFile,
  InputNumber,
} from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import { useRouter } from 'next/router';
import errorDatosGeneralesEvaluacion from '../utils/sections/errors/errorDatosGeneralesEvaluacion';
import { useEvaluacionCurricular } from '../utils/Context/evaluacionCurricularContext';
import getEvaluadores from '../utils/getEvaluadores';
import useCumplimiento from '../utils/getCumplimiento';
import getSolicitudesById from '../utils/getSolicitudesById';

export default function DatosGeneralesEvaluacion({ disabled, id, type }) {
  const {
    form, setForm, error, setError, setErrors,
  } = useEvaluacionCurricular();
  const [initialValues, setInitialValues] = useState({});
  const { solicitudes } = getSolicitudesById(id);
  const router = useRouter();
  const { query } = router;
  const { cumplimiento } = useCumplimiento(form.modalidad, form.numero);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const modalidadSource = type === 'editar' ? solicitudes?.programa?.modalidadId : query.modalidad;
    if (type === 'editar' && solicitudes?.programa?.evaluacion?.id) {
      setForm((prevForm) => ({
        ...prevForm,
        modalidad: modalidadSource,
        id: solicitudes.programa.evaluacion.id,
        evaluadorId: solicitudes.programa.evaluacion.evaluadorId,
        numero: solicitudes.programa.evaluacion.numero,
        valoracion: solicitudes.programa.evaluacion.valoracion,
        fecha: solicitudes.programa.evaluacion.fecha,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        modalidad: modalidadSource,
      }));
    }
    if (type === 'editar' && form.programaId) {
      const fileData = {
        entidadId: form.programaId,
        tipoEntidad: 'PROGRAMA',
        tipoDocumento: 'DICTAMEN_EVALUACION',
      };
      GetFile(fileData, setUrl);
    }
  }, [solicitudes, form.programaId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validation = errorDatosGeneralesEvaluacion(form, setError, error);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];
    if (value !== initialValue || value === '') {
      validation[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (validation !== undefined) {
      setErrors(validation);
    }
    if (cumplimiento) {
      setForm((prevForm) => ({
        ...prevForm,
        cumplimientoId: cumplimiento.id,
        porcentajeCumplimiento: cumplimiento.porcentajeCumplimiento,
      }));
    }
  }, [error, cumplimiento]);

  const { evaluadores } = getEvaluadores();

  const evaluadoresData = evaluadores.map((evaluador) => ({
    id: evaluador.id,
    nombre: `${evaluador.persona.nombre} ${evaluador.persona.apellidoPaterno}`,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos generales de evaluación</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <InputDateTime
            id="fecha"
            label="Fecha de dictamen"
            name="fecha"
            type="datetime"
            value={form.fecha}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            disabled={disabled}
            errorMessage={error.fecha}
            required
          />
        </Grid>
        <Grid item xs={9}>
          <BasicSelect
            title="Evaluador"
            name="evaluadorId"
            value={form.evaluadorId || ''}
            options={evaluadoresData}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.evaluadorId}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <InputNumber
            id="numero"
            label="Cumplimiento numerico"
            name="numero"
            value={form.numero}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.numero}
            min={50}
            max={250}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="porcentaje"
            label="Porcentaje"
            name="porcentaje"
            value={cumplimiento?.porcentajeCumplimiento}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="calificacion"
            label="Calificacion"
            name="calificacion"
            value={cumplimiento?.nombre}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="valoracion"
            label="Valoración cualitativa"
            name="valoracion"
            value={form.valoracion}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            multiline
            rows={4}
            sx={{ width: '100%' }}
            disabled={disabled}
            helperText={error.valoracion}
            error={!!error.valoracion}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            id={form.programaId}
            label="Dictamen de evaluación"
            tipoEntidad="PROGRAMA"
            tipoDocumento="DICTAMEN_EVALUACION"
            url={url}
            setUrl={setUrl}
            disabled={disabled}
            required
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

DatosGeneralesEvaluacion.defaultProps = {
  id: null,
};

DatosGeneralesEvaluacion.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.number,
  type: PropTypes.string.isRequired,
};
