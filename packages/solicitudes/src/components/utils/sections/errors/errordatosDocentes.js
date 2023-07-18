export default function errorDatosDocentes(form, setError, error) {
  const errors = {
    tipoDocente: () => {
      if (form.tipoDocente === undefined || form.tipoDocente === '') {
        setError({ ...error, tipoDocente: 'Seleccione un nivel' });
        return false;
      }
      setError({ ...error, tipoDocente: '' });
      return true;
    },
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (form.apellidoPaterno === undefined || form.apellidoPaterno === '') {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (form.apellidoMaterno === undefined || form.apellidoMaterno === '') {
        setError({ ...error, apellidoMaterno: 'Apellido materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nivelUltimoGrado: () => {
      if (form.nivelUltimoGrado === undefined || form.nivelUltimoGrado === '') {
        setError({ ...error, nivelUltimoGrado: 'Seleccione un Nivel' });
        return false;
      }
      setError({ ...error, nivelUltimoGrado: '' });
      return true;
    },
    nombreUltimoGrado: () => {
      if (
        form.nombreUltimoGrado === undefined
        || form.nombreUltimoGrado === ''
      ) {
        setError({ ...error, nombreUltimoGrado: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombreUltimoGrado: '' });
      return true;
    },
    documentoPresentadoUltimoGrado: () => {
      if (
        form.documentoPresentadoUltimoGrado === undefined
        || form.documentoPresentadoUltimoGrado === ''
      ) {
        setError({
          ...error,
          documentoPresentadoUltimoGrado: 'Seleccione un documento',
        });
        return false;
      }
      setError({ ...error, documentoPresentadoUltimoGrado: '' });
      return true;
    },
    nivelPenultimoGrado: () => {
      if (
        form.nivelPenultimoGrado === undefined
        || form.nivelPenultimoGrado === ''
      ) {
        setError({ ...error, nivelPenultimoGrado: 'Seleccione un Nivel' });
        return false;
      }
      setError({ ...error, nivelPenultimoGrado: '' });
      return true;
    },
    nombrePenultimoGrado: () => {
      if (
        form.nombrePenultimoGrado === undefined
        || form.nombrePenultimoGrado === ''
      ) {
        setError({ ...error, nombrePenultimoGrado: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombrePenultimoGrado: '' });
      return true;
    },
    documentoPresentadoPenultimoGrado: () => {
      if (
        form.documentoPresentadoPenultimoGrado === undefined
        || form.documentoPresentadoPenultimoGrado === ''
      ) {
        setError({
          ...error,
          documentoPresentadoPenultimoGrado: 'Seleccione un documento',
        });
        return false;
      }
      setError({ ...error, documentoPresentadoPenultimoGrado: '' });
      return true;
    },
    asignaturasPropuesta: () => {
      if (
        form.asignaturasPropuesta === undefined
        || form.asignaturasPropuesta === ''
      ) {
        setError({
          ...error,
          asignaturasPropuesta: 'Seleccione una asignatura',
        });
        return false;
      }
      setError({ ...error, asignaturasPropuesta: '' });
      return true;
    },
    tipoContratacion: () => {
      if (form.tipoContratacion === undefined || form.tipoContratacion === '') {
        setError({ ...error, tipoContratacion: 'Seleccione una asignatura' });
        return false;
      }
      setError({ ...error, tipoContratacion: '' });
      return true;
    },
    antiguedad: () => {
      if (form.antiguedad === undefined || form.antiguedad === '') {
        setError({ ...error, antiguedad: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, antiguedad: '' });
      return true;
    },
    totalHorasIndependiente: () => {
      if (
        form.totalHorasIndependiente === undefined
        || form.totalHorasIndependiente === ''
      ) {
        setError({ ...error, totalHorasIndependiente: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, totalHorasIndependiente: '' });
      return true;
    },
    experienciaLaboral: () => {
      if (
        form.experienciaLaboral === undefined
        || form.experienciaLaboral === ''
      ) {
        setError({ ...error, experienciaLaboral: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, experienciaLaboral: '' });
      return true;
    },
  };

  return errors;
}
