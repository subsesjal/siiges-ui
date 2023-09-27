export default function errorDatosInfraestructuras(form, setError, error) {
  const validNumber = /^-?\d*\.?\d+$/;
  const errors = {
    tipoInstalacionId: () => {
      if (form.tipoInstalacionId === undefined || form.tipoInstalacionId === '') {
        setError({ ...error, tipoInstalacionId: 'Seleccione una instalación' });
        return false;
      }
      setError({ ...error, tipoInstalacionId: '' });
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
    capacidad: () => {
      if (
        form.capacidad === undefined
        || form.capacidad === ''
        || !validNumber.test(form.capacidad)
      ) {
        setError({ ...error, capacidad: 'Capacidad invalidos' });
        return false;
      }
      setError({ ...error, capacidad: '' });
      return true;
    },
    metros: () => {
      if (
        form.metros === undefined
        || form.metros === ''
        || !validNumber.test(form.metros)
      ) {
        setError({ ...error, metros: 'Metros cuadrados invalidos' });
        return false;
      }
      setError({ ...error, metros: '' });
      return true;
    },
    ubicacion: () => {
      if (form.ubicacion === undefined || form.ubicacion === '') {
        setError({ ...error, ubicacion: 'Ubicacion invalida' });
        return false;
      }
      setError({ ...error, ubicacion: '' });
      return true;
    },
    recursos: () => {
      if (
        form.recursos === undefined
        || form.recursos === ''
      ) {
        setError({
          ...error,
          recursos: 'Recursos materiales invalidos',
        });
        return false;
      }
      setError({ ...error, recursos: '' });
      return true;
    },
    asignaturaInfraestructura: () => {
      if (form.asignaturaInfraestructura === undefined || form.asignaturaInfraestructura === '') {
        setError({ ...error, asignaturaInfraestructura: 'Asignaturas invalidas' });
        return false;
      }
      setError({ ...error, asignaturaInfraestructura: '' });
      return true;
    },
  };

  return errors;
}
