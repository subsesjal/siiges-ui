export default function errorTrayectoriaEducativa(form, setError, error) {
  const formData = form[9];
  const errors = {
    programaSeguimiento: () => {
      if (
        formData.programaSeguimiento === undefined
        || formData.programaSeguimiento === ''
      ) {
        setError({ ...error, programaSeguimiento: 'Conocimientos inválidos' });
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
        setError({ ...error, funcionTutorial: 'Habilidades inválidas' });
        return false;
      }
      setError({ ...error, funcionTutorial: '' });
      return true;
    },
    tipoTutoria: () => {
      if (formData.tipoTutoria === undefined || formData.tipoTutoria === '') {
        setError({ ...error, tipoTutoria: 'Turnos inválidos' });
        return false;
      }
      setError({ ...error, tipoTutoria: '' });
      return true;
    },
    tasaEgreso: () => {
      if (formData.tasaEgreso === undefined || formData.tasaEgreso === '') {
        setError({
          ...error,
          tasaEgreso: 'Proceso de selección inválida',
        });
        return false;
      }
      setError({ ...error, tasaEgreso: '' });
      return true;
    },
    estadisticasTitulacion: () => {
      if (
        formData.estadisticasTitulacion === undefined
        || formData.estadisticasTitulacion === ''
      ) {
        setError({ ...error, estadisticasTitulacion: 'Turnos inválidos' });
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
          modalidadesTitulacion: 'Proceso de selección inválido',
        });
        return false;
      }
      setError({ ...error, modalidadesTitulacion: '' });
      return true;
    },
  };

  return errors;
}
