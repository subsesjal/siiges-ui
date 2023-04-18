export default function errorDatosPlanEstudios(form, setError, error) {
  const errors = {
    nivel: () => {
      if (form.nivel === undefined || form.nivel === '') {
        setError({ ...error, nivel: 'Seleccione un nivel' });
        return false;
      }
      setError({ ...error, nivel: '' });
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
    modalidad: () => {
      if (form.modalidad === undefined || form.modalidad === '') {
        setError({ ...error, modalidad: 'Modalidad invalida' });
        return false;
      }
      setError({ ...error, modalidad: '' });
      return true;
    },
    periodo: () => {
      if (form.periodo === undefined || form.periodo === '') {
        setError({ ...error, periodo: 'Periodo invalida' });
        return false;
      }
      setError({ ...error, periodo: '' });
      return true;
    },
    turno: () => {
      if (form.turno === undefined || form.turno.lenth === 0) {
        setError({ ...error, turno: 'Turno invalido' });
        return false;
      }
      setError({ ...error, turno: '' });
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
