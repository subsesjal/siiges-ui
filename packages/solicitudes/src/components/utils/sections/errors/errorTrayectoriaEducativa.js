export default function errorTrayectoriaEducativa(form, setError, error) {
  const formData = form[9];
  const errors = {
    programaSeguimiento: () => {
      if (
        formData.programaSeguimiento === undefined
        || formData.programaSeguimiento === ''
      ) {
        setError({ ...error, programaSeguimiento: 'Conocimientos invalidos' });
        return false;
      }
      setError({ ...error, programaSeguimiento: '' });
      return true;
    },
    funcionTutorial: () => {
      if (
        formData.funcionTutorial === undefined
        || formData.funcionTutorial === ''
      ) {
        setError({ ...error, funcionTutorial: 'Habilidades invalidas' });
        return false;
      }
      setError({ ...error, funcionTutorial: '' });
      return true;
    },
    tipoTutoria: () => {
      if (formData.tipoTutoria === undefined || formData.tipoTutoria === '') {
        setError({ ...error, tipoTutoria: 'Turnos invalidos' });
        return false;
      }
      setError({ ...error, tipoTutoria: '' });
      return true;
    },
    tipoEgreso: () => {
      if (formData.tipoEgreso === undefined || formData.tipoEgreso === '') {
        setError({
          ...error,
          tipoEgreso: 'Proceso de selección invalida',
        });
        return false;
      }
      setError({ ...error, tipoEgreso: '' });
      return true;
    },
    estadisticasTitulacion: () => {
      if (
        formData.estadisticasTitulacion === undefined
        || formData.estadisticasTitulacion === ''
      ) {
        setError({ ...error, estadisticasTitulacion: 'Turnos invalidos' });
        return false;
      }
      setError({ ...error, estadisticasTitulacion: '' });
      return true;
    },
    modalidadesTitulacion: () => {
      if (
        formData.modalidadesTitulacion === undefined
        || formData.modalidadesTitulacion === ''
      ) {
        setError({
          ...error,
          modalidadesTitulacion: 'Proceso de selección invalida',
        });
        return false;
      }
      setError({ ...error, modalidadesTitulacion: '' });
      return true;
    },
  };

  return errors;
}
