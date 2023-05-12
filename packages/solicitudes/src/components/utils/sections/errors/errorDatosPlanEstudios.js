export default function errorDatosPlanEstudios(form, setError, error) {
  const errors = {
    nivelId: () => {
      if (form.programa.nivelId === undefined || form.programa.nivelId === '') {
        setError({ ...error, nivelId: 'Seleccione un nivel' });
        return false;
      }
      setError({ ...error, nivelId: '' });
      return true;
    },
    nombreProgramaEstudio: () => {
      if (form.nombreProgramaEstudio === undefined
        || form.nombreProgramaEstudio === '') {
        setError({ ...error, nombreProgramaEstudio: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombreProgramaEstudio: '' });
      return true;
    },
    cicloId: () => {
      if (form.programa.cicloId === undefined || form.programa.cicloId === '') {
        setError({ ...error, cicloId: 'Periodo invalido' });
        return false;
      }
      setError({ ...error, cicloId: '' });
      return true;
    },
    programaTurnos: () => {
      if (form.programa.programaTurnos === undefined || form.programa.programaTurnos.lenth === 0) {
        setError({ ...error, programaTurnos: 'Turnos invalidos' });
        return false;
      }
      setError({ ...error, programaTurnos: '' });
      return true;
    },
    duracionPrograma: () => {
      if (form.duracionPrograma === undefined || form.duracionPrograma === '') {
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
      if (form.creditos === undefined || form.creditos === '') {
        setError({ ...error, creditos: 'Creditos invalidos' });
        return false;
      }
      setError({ ...error, creditos: '' });
      return true;
    },
    nivelPrevio: () => {
      if (form.nivelPrevio === undefined || form.nivelPrevio === '') {
        setError({ ...error, nivelPrevio: 'Nivel previo invalido' });
        return false;
      }
      setError({ ...error, nivelPrevio: '' });
      return true;
    },
    objetivoGeneral: () => {
      if (form.objetivoGeneral === undefined || form.objetivoGeneral === '') {
        setError({ ...error, objetivoGeneral: 'Objetivo general invalido' });
        return false;
      }
      setError({ ...error, objetivoGeneral: '' });
      return true;
    },
  };

  return errors;
}
