export default function errorDatosAsignaturasFormacion(form, setError, error) {
  const validNumber = /^-?\d*\.?\d+$/;
  const errors = {
    gradoId: () => {
      if (form.gradoId === undefined || form.gradoId === '') {
        setError({ ...error, gradoId: 'Seleccione un grado' });
        return false;
      }
      setError({ ...error, gradoId: '' });
      return true;
    },
    area: () => {
      if (form.area === undefined || form.area === '') {
        setError({ ...error, area: 'Seleccione un área' });
        return false;
      }
      setError({ ...error, area: '' });
      return true;
    },
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: 'Nombre inválido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    clave: () => {
      if (form.clave === undefined || form.clave === '') {
        setError({ ...error, clave: 'Clave inválida' });
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
        setError({ ...error, creditos: 'Créditos inválidos' });
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
          formacionEspecializada: 'Formación especializada inválida',
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
        setError({ ...error, horasDocente: 'Horas docente inválidas' });
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
        setError({ ...error, horasIndependiente: 'Horas independiente inválidas' });
        return false;
      }
      setError({ ...error, horasIndependiente: '' });
      return true;
    },
  };

  return errors;
}
