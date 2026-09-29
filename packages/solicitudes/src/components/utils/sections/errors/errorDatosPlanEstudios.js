export default function errorDatosPlanEstudios(form, setError, error, tipoSolicitudId) {
  const formData = form[1];
  const validNumber = /^-?\d*\.?\d+$/;

  const validateField = (fieldName, errorMessage, testCondition) => {
    if (!testCondition) {
      setError((prevError) => ({ ...prevError, [fieldName]: errorMessage }));
      return false;
    }
    setError((prevError) => ({ ...prevError, [fieldName]: '' }));
    return true;
  };

  const errors = {
    nivelId: () => validateField(
      'nivelId',
      '¡Seleccione un nivel!',
      formData.programa?.nivelId !== undefined
          && formData.programa?.nivelId !== '',
    ),
    nombre: () => validateField(
      'nombre',
      '¡Nombre del programa es requerido!',
      formData.programa?.nombre !== undefined
          && formData.programa?.nombre !== '',
    ),
    cicloId: () => validateField(
      'cicloId',
      '¡Periodo es requerido!',
      formData.programa?.cicloId !== undefined
          && formData.programa?.cicloId !== '',
    ),
    programaTurnos: () => validateField(
      'programaTurnos',
      '¡Seleccione al menos un turno!',
      formData.programa?.programaTurnos !== undefined
          && formData.programa?.programaTurnos.length > 0,
    ),
    duracionPeriodos: () => validateField(
      'duracionPeriodos',
      '¡Duración del programa es requerida!',
      formData.programa?.duracionPeriodos !== undefined
          && formData.programa?.duracionPeriodos !== '',
    ),
    creditosOrdinarios: () => validateField(
      'creditosOrdinarios',
      '¡Créditos ordinarios son requeridos y deben ser un número válido!',
      formData.programa?.creditosOrdinarios !== undefined
          && formData.programa?.creditosOrdinarios !== ''
          && validNumber.test(formData.programa?.creditosOrdinarios),
    ),
    minimoCreditosOptativas: () => validateField(
      'minimoCreditosOptativas',
      '¡Créditos electivas son requeridos y deben ser un número válido!',
      formData.programa?.minimoCreditosOptativas !== undefined
          && formData.programa?.minimoCreditosOptativas !== ''
          && validNumber.test(formData.programa?.minimoCreditosOptativas),
    ),
    creditos: () => validateField(
      'creditos',
      '¡Captura los créditos ordinarios y optativas para calcular el total!',
      formData.programa?.creditos !== undefined
          && formData.programa?.creditos !== ''
          && validNumber.test(formData.programa?.creditos)
          && formData.programa?.creditosOrdinarios !== undefined
          && formData.programa?.creditosOrdinarios !== ''
          && validNumber.test(formData.programa?.creditosOrdinarios)
          && formData.programa?.minimoCreditosOptativas !== undefined
          && formData.programa?.minimoCreditosOptativas !== ''
          && validNumber.test(formData.programa?.minimoCreditosOptativas)
          && Number(formData.programa?.creditos)
            === Number(formData.programa?.creditosOrdinarios)
            + Number(formData.programa?.minimoCreditosOptativas),
    ),
    antecedenteAcademico: () => validateField(
      'antecedenteAcademico',
      '¡Nivel previo es requerido!',
      formData.programa?.antecedenteAcademico !== undefined
          && formData.programa?.antecedenteAcademico !== '',
    ),
  };

  if (tipoSolicitudId !== 3) {
    errors.objetivoGeneral = () => validateField(
      'objetivoGeneral',
      'Objetivo general es requerido',
      formData.programa?.objetivoGeneral !== undefined
          && formData.programa?.objetivoGeneral !== '',
    );
    errors.objetivosParticulares = () => validateField(
      'objetivosParticulares',
      '¡Objetivos particulares son requeridos!',
      formData.programa?.objetivosParticulares !== undefined
          && formData.programa?.objetivosParticulares !== '',
    );
  }

  return errors;
}
