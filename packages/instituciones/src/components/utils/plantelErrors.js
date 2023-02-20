export default function plantelErrors(form, setError, error, plantel) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^[0-9]+$/;
  const editar = {
    calle: false,
    numeroExterior: false,
    colonia: false,
    codigoPostal: false,
    municipioId: false,
    tipoInmuebleId: false,
    correo1: false,
    correo2: false,
    telefono1: false,
    telefono2: false,
    nombre: false,
    apellidoPaterno: false,
    apellidoMaterno: false,
    nacionalidad: false,
    curp: false,
    genero: false,
    correoPrimario: false,
  };

  if (plantel !== null) {
    if (plantel.domicilio.calle !== undefined) {
      editar.calle = true;
    }
    if (plantel.domicilio.numeroExterior !== undefined) {
      editar.numeroExterior = true;
    }
    if (plantel.domicilio.colonia !== undefined) {
      editar.colonia = true;
    }
    if (plantel.domicilio.codigoPostal !== undefined) {
      editar.codigoPostal = true;
    }
    if (plantel.domicilio.municipioId !== undefined) {
      editar.municipioId = true;
    }
    if (plantel.correo1 !== undefined) {
      editar.correo1 = true;
    }
    if (plantel.correo2 !== undefined) {
      editar.correo2 = true;
    }
    if (plantel.telefono1 !== undefined) {
      editar.telefono1 = true;
    }
    if (plantel.telefono2 !== undefined) {
      editar.telefono2 = true;
    }
    if (plantel.directores[0].nombre !== undefined) {
      editar.nombre = true;
    }
    if (plantel.directores[0].apellidoPaterno !== undefined) {
      editar.apellidoPaterno = true;
    }
    if (plantel.directores[0].apellidoMaterno !== undefined) {
      editar.apellidoMaterno = true;
    }
    if (plantel.directores[0].nacionalidad !== undefined) {
      editar.nacionalidad = true;
    }
    if (plantel.directores[0].curp !== undefined) {
      editar.curp = true;
    }
    if (plantel.directores[0].genero !== undefined) {
      editar.genero = true;
    }
    if (plantel.directores[0].correoPrimario !== undefined) {
      editar.correoPrimario = true;
    }
  }

  const errors = {
    calle: () => {
      if (
        (editar.calle === false && form.domicilio.calle === undefined)
        || form.domicilio.calle === ''
      ) {
        setError({ ...error, calle: 'Calle invalida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: () => {
      if (
        (editar.numeroExterior === false
          && form.domicilio.numeroExterior === '')
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
        (editar.colonia === false && form.domicilio.colonia === '')
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
        editar.codigoPostal === false
        && form.domicilio.codigoPostal !== undefined
        && form.domicilio.codigoPostal.match(validNumber)
      ) {
        setError({ ...error, codigoPostal: '' });
        return true;
      }
      setError({ ...error, codigoPostal: 'Codigo postal invalido' });
      return false;
    },
    municipioId: () => {
      if (
        editar.municipioId === false
        && form.domicilio.municipioId === undefined
      ) {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: () => {
      if (
        editar.tipoInmuebleId === false
        && form.tipoInmuebleId === undefined
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
        editar.correo1 === false
        && form.correo1 !== undefined
        && form.correo1.match(validEmail)
      ) {
        setError({ ...error, correo1: '' });
        return true;
      }
      setError({ ...error, correo1: 'Correo institucional invalido' });
      return false;
    },
    correo2: () => {
      if (
        editar.correo2 === false
        && form.correo2 !== undefined
        && form.correo2.match(validEmail)
      ) {
        setError({ ...error, correo2: '' });
        return true;
      }
      setError({ ...error, correo2: 'Correo de contacto invalido' });
      return false;
    },
    telefono1: () => {
      if (
        editar.telefono1 === false
        && form.telefono1 !== undefined
        && form.telefono1.match(validNumber)
      ) {
        setError({ ...error, telefono1: '' });
        return true;
      }
      setError({ ...error, telefono1: 'telefono 1 invalido' });
      return false;
    },
    telefono2: () => {
      if (
        editar.telefono2 === false
        && form.telefono2 !== undefined
        && form.telefono2.match(validNumber)
      ) {
        setError({ ...error, telefono2: '' });
        return true;
      }
      setError({ ...error, telefono2: 'telefono 2 invalido' });
      return false;
    },
    nombre: () => {
      if (
        (editar.nombre === false && form.director.persona.nombre === '')
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
        (editar.apellidoPaterno === false
          && form.director.persona.apellidoPaterno === '')
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
        (editar.apellidoMaterno === false
          && form.director.persona.apellidoMaterno === '')
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
        (editar.nacionalidad === false
          && form.director.persona.nacionalidad === '')
        || form.director.persona.nacionalidad === undefined
      ) {
        setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
    curp: () => {
      if (
        editar.curp === false
        && form.director.persona.curp !== undefined
        && form.director.persona.curp.length === 18
      ) {
        setError({ ...error, curp: '' });
        return true;
      }
      setError({ ...error, curp: 'Curp debe tener 18 caracteres' });
      return false;
    },
    sexo: () => {
      if (
        (editar.sexo === false && form.director.persona.sexo === '')
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
        editar.correoPrimario === false
        && form.director.persona.correoPrimario !== undefined
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
