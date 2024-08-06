export default function errorIngreso(form, setError, error) {
  const formData = form[3];
  const errors = {
    metodosInduccion: () => {
      if (formData.programa?.metodosInduccion === undefined || formData.programa?.metodosInduccion === '') {
        setError({ ...error, metodosInduccion: 'Métodos de inducción inválidos' });
        return false;
      }
      setError({ ...error, metodosInduccion: '' });
      return true;
    },
    perfilIngresoConocimientos: () => {
      if (formData.programa?.perfilIngresoConocimientos === undefined || formData.programa?.perfilIngresoConocimientos === '') {
        setError({ ...error, perfilIngresoConocimientos: 'Conocimientos inválidos' });
        return false;
      }
      setError({ ...error, perfilIngresoConocimientos: '' });
      return true;
    },
    perfilIngresoHabilidades: () => {
      if (formData.programa?.perfilIngresoHabilidades === undefined || formData.programa?.perfilIngresoHabilidades === '') {
        setError({ ...error, perfilIngresoHabilidades: 'Habilidades inválidas' });
        return false;
      }
      setError({ ...error, perfilIngresoHabilidades: '' });
      return true;
    },
    perfilIngresoActitudes: () => {
      if (formData.programa?.perfilIngresoActitudes === undefined || formData.programa?.perfilIngresoActitudes === '') {
        setError({ ...error, perfilIngresoActitudes: 'Turnos inválidos' });
        return false;
      }
      setError({ ...error, perfilIngresoActitudes: '' });
      return true;
    },
    procesoSeleccion: () => {
      if (formData.programa?.procesoSeleccion === undefined || formData.programa?.procesoSeleccion === '') {
        setError({
          ...error,
          procesoSeleccion: 'Proceso de selección inválida',
        });
        return false;
      }
      setError({ ...error, procesoSeleccion: '' });
      return true;
    },
  };

  return errors;
}
