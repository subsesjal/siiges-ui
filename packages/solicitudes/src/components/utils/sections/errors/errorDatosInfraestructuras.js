export default function errorDatosInfraestructuras(form, setError, error) {
  const validNumber = /^-?\d*\.?\d+$/;
  const errors = {
    tipoInstalacionId: () => {
      if (
        form.tipoInstalacionId === undefined
        || form.tipoInstalacionId === ''
      ) {
        setError({ ...error, tipoInstalacionId: '¡Seleccione una instalación!' });
        return false;
      }
      setError({ ...error, tipoInstalacionId: '' });
      return true;
    },
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: '¡Nombre inválido!' });
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
        setError({ ...error, capacidad: '¡Capacidad inválida!' });
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
        setError({ ...error, metros: '¡Metros cuadrados inválidos!' });
        return false;
      }
      setError({ ...error, metros: '' });
      return true;
    },
    ubicacion: () => {
      if (form.ubicacion === undefined || form.ubicacion === '') {
        setError({ ...error, ubicacion: '¡Ubicación inválida!' });
        return false;
      }
      setError({ ...error, ubicacion: '' });
      return true;
    },
    recursos: () => {
      if (form.recursos === undefined || form.recursos === '') {
        setError({
          ...error,
          recursos: '¡Recursos materiales inválidos!',
        });
        return false;
      }
      setError({ ...error, recursos: '' });
      return true;
    },
    asignaturasInfraestructura: () => {
      if (form.tipoInstalacionId === 1) {
        if (
          form.asignaturasInfraestructura === undefined
          || form.asignaturasInfraestructura === ''
        ) {
          setError({
            ...error,
            asignaturasInfraestructura: '¡Asignaturas inválidas!',
          });
          return false;
        }
      }
      setError({ ...error, asignaturasInfraestructura: '' });
      return true;
    },
  };

  return errors;
}
