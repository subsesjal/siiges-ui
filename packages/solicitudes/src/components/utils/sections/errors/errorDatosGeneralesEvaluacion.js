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
    numero: () => validateField(
      'numero',
      'Cumplimiento numerico invalidos',
      true,
    ),
    valoracion: () => validateField('valoracion', 'Valoracion cualitativa invalido'),
  };

  return errors;
}
