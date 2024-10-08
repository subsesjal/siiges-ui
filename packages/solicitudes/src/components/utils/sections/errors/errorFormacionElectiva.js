export default function errorFormacionElectiva(form, setError, error) {
  const validNumber = /^-?\d*\.?\d+$/;
  const formData = form[7];
  const errors = {
    minimoHorasOptativas: () => {
      if (
        formData.programa?.minimoHorasOptativas === undefined
        || formData.programa?.minimoHorasOptativas === ''
        || !validNumber.test(formData.programa?.minimoHorasOptativas)
      ) {
        setError({
          ...error,
          minimoHorasOptativas: '¡Minímo de horas inválido!',
        });
        return false;
      }
      setError({ ...error, minimoHorasOptativas: '' });
      return true;
    },
    minimoCreditosOptativas: () => {
      if (
        formData.programa?.minimoCreditosOptativas === undefined
        || formData.programa?.minimoCreditosOptativas === ''
        || !validNumber.test(formData.programa?.minimoCreditosOptativas)
      ) {
        setError({
          ...error,
          minimoCreditosOptativas: '¡Minímo de créditos inválido!',
        });
        return false;
      }
      setError({ ...error, minimoCreditosOptativas: '' });
      return true;
    },
  };

  return errors;
}
