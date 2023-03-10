export default function plantelErrors(form, setError, error, plantel) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^[0-9]+$/;
  let director;
  let domicilio;
  let data;

  if (plantel !== null) {
    domicilio = plantel.domicilio;
    data = plantel;
    if (plantel.directores[0] !== undefined) {
      director = plantel.directores[0].persona;
    }
  }

  const errors = {
    calle: () => {
      if (
        (domicilio === undefined || domicilio.calle === null)
        && (form.domicilio.calle === undefined || form.domicilio.calle === '')
      ) {
        setError({ ...error, calle: 'Calle invalida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: () => {
      if (
        (domicilio === undefined || domicilio.numeroExterior === null)
        && (form.domicilio.numeroExterior === undefined
          || form.domicilio.numeroExterior === '')
      ) {
        setError({ ...error, numeroExterior: 'Numero exterior invalido' });
        return false;
      }
      setError({ ...error, numeroExterior: '' });
      return true;
    },
    colonia: () => {
      if (
        (domicilio === undefined || domicilio.colonia === null)
        && (form.domicilio.colonia === undefined || form.domicilio.colonia === '')
      ) {
        setError({ ...error, colonia: 'Colonia invalida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: () => {
      if (
        (domicilio === undefined || domicilio.codigoPostal === null)
        && (form.domicilio.codigoPostal === undefined
          || form.domicilio.codigoPostal === ''
          || !form.domicilio.codigoPostal.match(validNumber))
      ) {
        setError({
          ...error,
          codigoPostal: 'Codigo postal invalido',
        });
        return false;
      }
      setError({ ...error, codigoPostal: '' });
      return true;
    },
    municipioId: () => {
      if (
        (domicilio === undefined || domicilio.municipioId === null)
        && (form.domicilio.municipioId === undefined
          || form.domicilio.municipioId === '')
      ) {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: () => {
      if (
        (data === undefined || data.tipoInmuebleId === null)
        && (form.tipoInmuebleId === undefined || form.tipoInmuebleId === '')
      ) {
        setError({
          ...error,
          tipoInmuebleId: 'Seleccione un tipo de inmueble',
        });
        return false;
      }
      setError({ ...error, tipoInmuebleId: '' });
      return true;
    },
    correo1: () => {
      if (
        (data === undefined || data.correo1 === null)
        && (form.correo1 === undefined
          || form.correo1 === ''
          || !form.correo1.match(validEmail))
      ) {
        setError({ ...error, correo1: 'Correo institucional invalido' });
        return false;
      }
      setError({ ...error, correo1: '' });
      return true;
    },
    correo2: () => {
      if (
        (data === undefined || data.correo2 === null)
        && (form.correo2 === undefined
          || form.correo2 === ''
          || !form.correo2.match(validEmail))
      ) {
        setError({ ...error, correo2: 'Correo de contacto invalido' });
        return false;
      }
      setError({ ...error, correo2: '' });
      return true;
    },
    telefono1: () => {
      if (
        (data === undefined || data.telefono1 === null)
        && (form.telefono1 === undefined
          || form.telefono1 === ''
          || !form.telefono1.match(validNumber))
      ) {
        setError({ ...error, telefono1: 'telefono 1 invalido' });
        return false;
      }
      setError({ ...error, telefono1: '' });
      return true;
    },
    telefono2: () => {
      if (
        (data === undefined || data.telefono2 === null)
        && (form.telefono2 === undefined
          || form.telefono2 === ''
          || !form.telefono2.match(validNumber))
      ) {
        setError({ ...error, telefono2: 'telefono 2 invalido' });
        return false;
      }
      setError({ ...error, telefono2: '' });
      return true;
    },
    nombre: () => {
      if (
        (director === undefined || director.nombre === null)
        && (form.director.persona.nombre === undefined
          || form.director.persona.nombre === '')
      ) {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (
        (director === undefined || director.apellidoPaterno === null)
        && (form.director.persona.apellidoPaterno === undefined
          || form.director.persona.apellidoPaterno === '')
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (
        (director === undefined || director.apellidoMaterno === null)
        && (form.director.persona.apellidoMaterno === undefined
          || form.director.persona.apellidoMaterno === '')
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido Materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nacionalidad: () => {
      if (
        (director === undefined || director.nacionalidad === null)
        && (form.director.persona.nacionalidad === undefined
          || form.director.persona.nacionalidad === '')
      ) {
        setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
    curp: () => {
      if (
        (director === undefined || director.curp === null)
        && (form.director.persona.curp === undefined
          || form.director.persona.curp === ''
          || form.director.persona.curp.length !== 18)
      ) {
        setError({ ...error, curp: 'Curp debe tener 18 caracteres' });
        return false;
      }
      setError({ ...error, curp: '' });
      return true;
    },
    sexo: () => {
      if (
        (director === undefined || director.sexo === null)
        && (form.director.persona.sexo === undefined
          || form.director.persona.sexo === '')
      ) {
        setError({ ...error, sexo: 'Genero invalido' });
        return false;
      }
      setError({ ...error, sexo: '' });
      return true;
    },
    correoPrimario: () => {
      if (
        (director === undefined || director.correoPrimario === null)
        && (form.director.persona.correoPrimario === undefined
          || form.director.persona.correoPrimario === ''
          || !form.director.persona.correoPrimario.match(validEmail))
      ) {
        setError({ ...error, correoPrimario: 'Correo invalido' });
        return false;
      }
      setError({ ...error, correoPrimario: '' });
      return true;
    },
  };

  return errors;
}
