export default function errorDatosGeneralesEvaluacion(form, setError, error) {
  const validateField = (fieldName, errorMessage, validateNumber = false) => {
    const newValue = form[fieldName];
    let isValid = true;

    if (
      newValue === undefined
      || newValue === ''
      || (validateNumber && !/^-?\d*\.?\d+$/.test(newValue))
    ) {
      setError({ ...error, [fieldName]: errorMessage });
      isValid = false;
    } else {
      setError({ ...error, [fieldName]: '' });
    }

    return isValid;
  };

  const errors = {
    fecha: () => validateField('fecha', 'Fecha de dictamen invalida'),
    evaluadorId: () => validateField('evaluadorId', 'Evaluador invalido'),
    cumplimientoNumerico: () => validateField(
      'cumplimientoNumerico',
      'Cumplimiento numerico invalidos',
      true,
    ),
    valoracionCualitativa: () => validateField('valoracionCualitativa', 'Valoracion cualitativa invalido'),
  };

  return errors;
}
