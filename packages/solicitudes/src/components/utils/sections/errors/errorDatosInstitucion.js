export default function errorDatosInstitucion(form, setError, error) {
  const formData = form[1];
  const errors = {
    razonSocial: () => {
      if (
        formData.programa?.razonSocial === undefined
        || formData.programa?.razonSocial === ''
      ) {
<<<<<<< HEAD
<<<<<<< HEAD
        setError({ ...error, razonSocial: '¡Razón social inválida!' });
=======
        setError({ ...error, razonSocial: 'Razón social inválida' });
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
        setError({ ...error, razonSocial: '¡Razón social inválida!' });
>>>>>>> 063e4b7 (correcion)
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
<<<<<<< HEAD
<<<<<<< HEAD
          nombreInstitucion: '¡Nombre de institución inválido!',
=======
          nombreInstitucion: 'Nombre de institución inválido',
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
          nombreInstitucion: '¡Nombre de institución inválido!',
>>>>>>> 063e4b7 (correcion)
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
<<<<<<< HEAD
<<<<<<< HEAD
        setError({ ...error, historia: '¡Historia inválida!' });
=======
        setError({ ...error, historia: 'Historia inválida' });
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
        setError({ ...error, historia: '¡Historia inválida!' });
>>>>>>> 063e4b7 (correcion)
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
<<<<<<< HEAD
<<<<<<< HEAD
        setError({ ...error, vision: '¡Visión inválida!' });
=======
        setError({ ...error, vision: 'Visión inválida' });
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
        setError({ ...error, vision: '¡Visión inválida!' });
>>>>>>> 063e4b7 (correcion)
        return false;
      }
      setError({ ...error, vision: '' });
      return true;
    },
    mision: () => {
      if (formData.mision === undefined || formData.mision === '') {
        setError({
          ...error,
<<<<<<< HEAD
<<<<<<< HEAD
          mision: '¡Misión inválida!',
=======
          mision: 'Misión inválida',
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
          mision: '¡Misión inválida!',
>>>>>>> 063e4b7 (correcion)
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
<<<<<<< HEAD
<<<<<<< HEAD
          valoresInstitucionales: '¡Valores institucionales inválidos!',
=======
          valoresInstitucionales: 'Valores institucionales inválidos',
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
          valoresInstitucionales: '¡Valores institucionales inválidos!',
>>>>>>> 063e4b7 (correcion)
        });
        return false;
      }
      setError({ ...error, valoresInstitucionales: '' });
      return true;
    },
  };

  return errors;
}
