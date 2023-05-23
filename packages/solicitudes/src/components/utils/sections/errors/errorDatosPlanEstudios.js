export default function errorDatosPlanEstudios(form, setError, error) {
  const formData = form[0];
  const validNumber = /^-?\d*\.?\d+$/;
  const errors = {
    nivelId: () => {
      if (formData.programa?.nivelId === undefined || formData.programa?.nivelId === '') {
        setError({ ...error, nivelId: 'Seleccione un nivel' });
        return false;
      }
      setError({ ...error, nivelId: '' });
      return true;
    },
    nombreProgramaEstudio: () => {
      if (formData.nombreProgramaEstudio === undefined || formData.nombreProgramaEstudio === '') {
        setError({ ...error, nombreProgramaEstudio: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombreProgramaEstudio: '' });
      return true;
    },
    cicloId: () => {
      if (formData.programa?.cicloId === undefined || formData.programa?.cicloId === '') {
        setError({ ...error, cicloId: 'Periodo invalido' });
        return false;
      }
      setError({ ...error, cicloId: '' });
      return true;
    },
    programaTurnos: () => {
      if (formData.programa?.programaTurnos === undefined
        || formData.programa?.programaTurnos.lenth === 0) {
        setError({ ...error, programaTurnos: 'Turnos invalidos' });
        return false;
      }
      setError({ ...error, programaTurnos: '' });
      return true;
    },
    duracionPrograma: () => {
      if (formData.duracionPrograma === undefined || formData.duracionPrograma === '') {
        setError({
          ...error,
          duracionPrograma: 'Duracion del programa invalida',
        });
        return false;
      }
      setError({ ...error, duracionPrograma: '' });
      return true;
    },
    creditos: () => {
      if (formData.creditos === undefined || formData.creditos === '' || !validNumber.test(formData.creditos)) {
        setError({ ...error, creditos: 'Creditos invalidos' });
        return false;
      }
      setError({ ...error, creditos: '' });
      return true;
    },
    nivelPrevio: () => {
      if (formData.nivelPrevio === undefined || formData.nivelPrevio === '') {
        setError({ ...error, nivelPrevio: 'Nivel previo invalido' });
        return false;
      }
      setError({ ...error, nivelPrevio: '' });
      return true;
    },
    objetivoGeneral: () => {
      if (formData.objetivoGeneral === undefined || formData.objetivoGeneral === '') {
        setError({ ...error, objetivoGeneral: 'Objetivo general invalido' });
        return false;
      }
      setError({ ...error, objetivoGeneral: '' });
      return true;
    },
  };

  return errors;
}
