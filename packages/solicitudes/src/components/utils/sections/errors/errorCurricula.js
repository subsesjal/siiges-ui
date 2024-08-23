export default function errorCurricula(form, setError, error) {
  const formData = form[5];
  const errors = {
    mapaCurricular: () => {
      if (formData.programa?.mapaCurricular === undefined || formData.programa?.mapaCurricular === '') {
        setError({ ...error, mapaCurricular: '¡Mapa curricular inválido!' });
        return false;
      }
      setError({ ...error, mapaCurricular: '' });
      return true;
    },
    flexibilidadCurricular: () => {
      if (formData.programa?.flexibilidadCurricular === undefined || formData.programa?.flexibilidadCurricular === '') {
        setError({ ...error, flexibilidadCurricular: '¡Flexibilidad curricular inválida!' });
        return false;
      }
      setError({ ...error, flexibilidadCurricular: '' });
      return true;
    },
    lineasGeneracionAplicacionConocimiento: () => {
      if (formData.programa?.lineasGeneracionAplicacionConocimiento === undefined || formData.programa?.lineasGeneracionAplicacionConocimiento === '') {
        setError({ ...error, lineasGeneracionAplicacionConocimiento: '¡Líneas de generación del conocimiento inválidas!' });
        return false;
      }
      setError({ ...error, lineasGeneracionAplicacionConocimiento: '' });
      return true;
    },
    actualizacion: () => {
      if (formData.programa?.actualizacion === undefined || formData.programa?.actualizacion === '') {
        setError({
          ...error,
          actualizacion: '¡Actualización inválida!',
        });
        return false;
      }
      setError({ ...error, actualizacion: '' });
      return true;
    },
    conveniosVinculacion: () => {
      if (formData.programa?.conveniosVinculacion === undefined || formData.programa?.conveniosVinculacion === '') {
        setError({
          ...error,
          conveniosVinculacion: '¡Vinculación inválida!',
        });
        return false;
      }
      setError({ ...error, conveniosVinculacion: '' });
      return true;
    },
  };

  return errors;
}
