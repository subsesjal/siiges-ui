export default function errorDatosDocentes(form, setError, error) {
  const validNumber = /^-?\d*\.?\d+$/;
  const errors = {
    grado: () => {
      if (form.grado === undefined || form.grado === '') {
        setError({ ...error, grado: 'Seleccione un nivel' });
        return false;
      }
      setError({ ...error, grado: '' });
      return true;
    },
    area: () => {
      if (form.area === undefined || form.area === '') {
        setError({ ...error, area: 'Seleccione un area' });
        return false;
      }
      setError({ ...error, area: '' });
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
    clave: () => {
      if (form.clave === undefined || form.clave === '') {
        setError({ ...error, clave: 'Clave invalida' });
        return false;
      }
      setError({ ...error, clave: '' });
      return true;
    },
    creditos: () => {
      if (
        form.creditos === undefined
        || form.creditos === ''
        || !validNumber.test(form.creditos)
      ) {
        setError({ ...error, creditos: 'Creditos invalidos' });
        return false;
      }
      setError({ ...error, creditos: '' });
      return true;
    },
    formacionEspecializada: () => {
      if (
        form.formacionEspecializada === undefined
        || form.formacionEspecializada === ''
      ) {
        setError({
          ...error,
          formacionEspecializada: 'Formación especializada invalida',
        });
        return false;
      }
      setError({ ...error, formacionEspecializada: '' });
      return true;
    },
    horasDocente: () => {
      if (
        form.horasDocente === undefined
        || form.horasDocente === ''
        || !validNumber.test(form.horasDocente)
      ) {
        setError({ ...error, horasDocente: 'Horas docente invalidos' });
        return false;
      }
      setError({ ...error, horasDocente: '' });
      return true;
    },
    horasIndependiente: () => {
      if (
        form.horasIndependiente === undefined
        || form.horasIndependiente === ''
        || !validNumber.test(form.horasIndependiente)
      ) {
        setError({ ...error, horasIndependiente: 'Horas independiente invalidos' });
        return false;
      }
      setError({ ...error, horasIndependiente: '' });
      return true;
    },
  };

  return errors;
}
