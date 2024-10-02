export default function errorEgreso(form, setError, error) {
  const formData = form[4];
  const errors = {
    perfilEgresoConocimientos: () => {
      if (formData.programa?.perfilEgresoConocimientos === undefined || formData.programa?.perfilEgresoConocimientos === '') {
        setError({ ...error, perfilEgresoConocimientos: '¡Conocimientos inválidos!' });
        return false;
      }
      setError({ ...error, perfilEgresoConocimientos: '' });
      return true;
    },
    perfilEgresoHabilidades: () => {
      if (formData.programa?.perfilEgresoHabilidades === undefined || formData.programa?.perfilEgresoHabilidades === '') {
        setError({ ...error, perfilEgresoHabilidades: '¡Habilidades inválidas!' });
        return false;
      }
      setError({ ...error, perfilEgresoHabilidades: '' });
      return true;
    },
    perfilEgresoActitudes: () => {
      if (formData.programa?.perfilEgresoActitudes === undefined || formData.programa?.perfilEgresoActitudes === '') {
        setError({ ...error, perfilEgresoActitudes: '¡Turnos inválidos!' });
        return false;
      }
      setError({ ...error, perfilEgresoActitudes: '' });
      return true;
    },
    seguimientoEgresados: () => {
      if (formData.programa?.seguimientoEgresados === undefined || formData.programa?.seguimientoEgresados === '') {
        setError({
          ...error,
          seguimientoEgresados: '¡Proceso de selección inválida!',
        });
        return false;
      }
      setError({ ...error, seguimientoEgresados: '' });
      return true;
    },
  };

  return errors;
}
