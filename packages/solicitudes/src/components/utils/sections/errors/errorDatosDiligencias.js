export default function errorDatosDiligencias(form, setError, error) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^-?\d*\.?\d+$/;
  const { persona } = form;
  const errors = {
    nombre: () => {
      if (persona?.nombre === undefined || persona?.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (
        persona?.apellidoPaterno === undefined
        || persona?.apellidoPaterno === ''
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido Paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (
        persona?.apellidoMaterno === undefined
        || persona?.apellidoMaterno === ''
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido Paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    tituloCargo: () => {
      if (persona?.tituloCargo === undefined || persona?.tituloCargo === '') {
        setError({ ...error, tituloCargo: 'Titulo Cargo invalida' });
        return false;
      }
      setError({ ...error, tituloCargo: '' });
      return true;
    },
    correo_primario: () => {
      if (
        persona?.correo_primario === undefined
        || persona?.correo_primario === ''
        || !persona?.correo_primario.match(validEmail)
      ) {
        setError({
          ...error,
          correo_primario: 'Correo institucional invalido',
        });
        return false;
      }
      setError({ ...error, correo_primario: '' });
      return true;
    },
    telefono: () => {
      if (
        persona?.telefono === undefined
        || persona?.telefono === ''
        || !validNumber.test(persona?.telefono)
      ) {
        setError({ ...error, telefono: 'telefono invalidos' });
        return false;
      }
      setError({ ...error, telefono: '' });
      return true;
    },
    celular: () => {
      if (
        persona?.celular === undefined
        || persona?.celular === ''
        || !validNumber.test(persona?.celular)
      ) {
        setError({ ...error, celular: 'celular invalidos' });
        return false;
      }
      setError({ ...error, celular: '' });
      return true;
    },
    horaInicio: () => {
      if (form.horaInicio === undefined || form.horaInicio === '') {
        setError({
          ...error,
          horaInicio: 'Hora de inicio invalida',
        });
        return false;
      }
      setError({ ...error, horaInicio: '' });
      return true;
    },
    horaFin: () => {
      if (form.horaFin === undefined || form.horaFin === '') {
        setError({
          ...error,
          horaFin: 'Hora de fin invalida',
        });
        return false;
      }
      setError({ ...error, horaFin: '' });
      return true;
    },
  };

  return errors;
}
