export default function plantelErrors(form, setError, error) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^[0-9]+$/;

  const errors = {
    calle: () => {
      if (form.domicilio.calle === '' || form.domicilio.calle === undefined) {
        setError({ ...error, calle: 'Calle invalida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: () => {
      if (
        form.domicilio.numeroExterior === ''
        || form.domicilio.numeroExterior === undefined
      ) {
        setError({ ...error, numeroExterior: 'Numero exterior invalido' });
        return false;
      }
      setError({ ...error, numeroExterior: '' });
      return true;
    },
    colonia: () => {
      if (
        form.domicilio.colonia === ''
        || form.domicilio.colonia === undefined
      ) {
        setError({ ...error, colonia: 'Colonia invalida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: () => {
      if (
        form.domicilio.codigoPostal.match(validNumber)
        && form.domicilio.codigoPostal !== undefined
      ) {
        setError({ ...error, codigoPostal: '' });
        return true;
      }
      setError({ ...error, codigoPostal: 'Codigo postal invalido' });
      return false;
    },
    correo1: () => {
      if (form.correo1 !== undefined && form.correo1.match(validEmail)) {
        setError({ ...error, correo1: '' });
        return true;
      }
      setError({ ...error, correo1: 'Correo institucional invalido' });
      return false;
    },
    correo2: () => {
      if (form.correo2 !== undefined && form.correo2.match(validEmail)) {
        setError({ ...error, correo2: '' });
        return true;
      }
      setError({ ...error, correo2: 'Correo de contacto invalido' });
      return false;
    },
    municipio: () => {
      if (form.municipioId === undefined) {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: () => {
      if (form.tipoInmuebleId === undefined) {
        setError({
          ...error,
          tipoInmuebleId: 'Seleccione un tipo de inmueble',
        });
        return false;
      }
      setError({ ...error, tipoInmuebleId: '' });
      return true;
    },
    telefono1: () => {
      if (form.telefono1.match(validNumber) && form.telefono1 !== undefined) {
        setError({ ...error, telefono1: '' });
        return true;
      }
      setError({ ...error, telefono1: 'telefono 1 invalido' });
      return false;
    },
    telefono2: () => {
      if (form.telefono2.match(validNumber) && form.telefono2 !== undefined) {
        setError({ ...error, telefono2: '' });
        return true;
      }
      setError({ ...error, telefono2: 'telefono 2 invalido' });
      return false;
    },
    nombre: () => {
      if (
        form.director.persona.nombre === ''
        || form.director.persona.nombre === undefined
      ) {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (
        form.director.persona.apellidoPaterno === ''
        || form.director.persona.apellidoPaterno === undefined
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (
        form.director.persona.apellidoMaterno === ''
        || form.director.persona.apellidoMaterno === undefined
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido Materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nacionalidad: () => {
      if (
        form.director.persona.nacionalidad === ''
        || form.director.persona.nacionalidad === undefined
      ) {
        setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
    sexo: () => {
      if (
        form.director.persona.sexo === ''
        || form.director.persona.sexo === undefined
      ) {
        setError({ ...error, sexo: 'Genero invalido' });
        return false;
      }
      setError({ ...error, sexo: '' });
      return true;
    },
    correoPrimario: () => {
      if (
        form.director.persona.correoPrimario !== undefined
        && form.director.persona.correoPrimario.match(validEmail)
      ) {
        setError({ ...error, correoPrimario: '' });
        return true;
      }
      setError({ ...error, correoPrimario: 'Correo invalido' });
      return false;
    },
  };

  return errors;
}
