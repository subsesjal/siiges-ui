export default function errorDatosInstitucion(form, setError, error) {
  const formData = form[1];
  const errors = {
    razonSocial: () => {
      if (
        formData.programa?.razonSocial === undefined
        || formData.programa?.razonSocial === ''
      ) {
        setError({ ...error, razonSocial: 'Razón social inválida' });
        return false;
      }
      setError({ ...error, razonSocial: '' });
      return true;
    },
    nombreInstitucion: () => {
      if (
        formData.programa?.nombreInstitucion === undefined
        || formData.programa?.nombreInstitucion === ''
      ) {
        setError({
          ...error,
          nombreInstitucion: 'Nombre de institucion inválido',
        });
        return false;
      }
      setError({ ...error, nombreInstitucion: '' });
      return true;
    },
    historia: () => {
      if (
        formData.programa?.historia === undefined
        || formData.programa?.historia === ''
      ) {
        setError({ ...error, historia: 'Historia inválida' });
        return false;
      }
      setError({ ...error, historia: '' });
      return true;
    },
    vision: () => {
      if (
        formData.programa?.vision === undefined
        || formData.programa?.vision === ''
      ) {
        setError({ ...error, vision: 'Visión inválida' });
        return false;
      }
      setError({ ...error, vision: '' });
      return true;
    },
    mision: () => {
      if (formData.mision === undefined || formData.mision === '') {
        setError({
          ...error,
          mision: 'Misión inválida',
        });
        return false;
      }
      setError({ ...error, mision: '' });
      return true;
    },
    valoresInstitucionales: () => {
      if (
        formData.valoresInstitucionales === undefined
        || formData.valoresInstitucionales === ''
      ) {
        setError({
          ...error,
          valoresInstitucionales: 'Valores institucionales inválidos',
        });
        return false;
      }
      setError({ ...error, valoresInstitucionales: '' });
      return true;
    },
  };

  return errors;
}
