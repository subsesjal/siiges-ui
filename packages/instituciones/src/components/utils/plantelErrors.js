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

  if (plantel !== undefined) {
    if (plantel.domicilio.calle !== '') {
      editar.calle = true;
    }
    if (plantel.domicilio.numeroExterior !== '') {
      editar.numeroExterior = true;
    }
    if (plantel.domicilio.colonia !== '') {
      editar.colonia = true;
    }
    if (plantel.domicilio.codigoPostal !== '') {
      editar.codigoPostal = true;
    }
    if (plantel.domicilio.municipioId !== '') {
      editar.municipioId = true;
    }
    if (plantel.correo1 !== '') {
      editar.correo1 = true;
    }
    if (plantel.correo2 !== '') {
      editar.correo2 = true;
    }
    if (plantel.telefono1 !== '') {
      editar.telefono1 = true;
    }
    if (plantel.telefono2 !== '') {
      editar.telefono2 = true;
    }
    if (plantel.directores[0]?.nombre !== '') {
      editar.nombre = true;
    }
    if (plantel.directores[0]?.apellidoPaterno !== '') {
      editar.apellidoPaterno = true;
    }
    if (plantel.directores[0]?.apellidoMaterno !== '') {
      editar.apellidoMaterno = true;
    }
    if (plantel.directores[0]?.nacionalidad !== '') {
      editar.nacionalidad = true;
    }
    if (plantel.directores[0]?.curp !== '') {
      editar.curp = true;
    }
    if (plantel.directores[0]?.genero !== '') {
      editar.genero = true;
    }
    if (plantel.directores[0]?.correoPrimario !== '') {
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
          && form.domicilio.numeroExterior === undefined)
        || form.domicilio.numeroExterior === ''
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
        || form.domicilio.colonia === ''
      ) {
        setError({ ...error, colonia: 'Colonia invalida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: () => {
      if (
        (editar.codigoPostal === false && form.domicilio.codigoPostal !== undefined)
        || !form.domicilio.codigoPostal.match(validNumber)
      ) {
        setError({ ...error, codigoPostal: 'Codigo postal invalido' });
        return false;
      }
      setError({ ...error, codigoPostal: '' });
      return true;
    },
    municipioId: () => {
      if (editar.municipioId === false && form.domicilio.municipioId === '') {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: () => {
      if (editar.tipoInmuebleId === false && form.tipoInmuebleId === '') {
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
        (editar.correo1 === false && form.correo1 === '')
        || form.correo1.match(validEmail)
      ) {
        setError({ ...error, correo1: 'Correo institucional invalido' });
        return false;
      }
      setError({ ...error, correo1: '' });
      return true;
    },
    correo2: () => {
      if (
        (editar.correo2 === false && form.correo2 === '')
        || form.correo2.match(validEmail)
      ) {
        setError({ ...error, correo2: 'Correo de contacto invalido' });
        return false;
      }
      setError({ ...error, correo2: '' });
      return true;
    },
    telefono1: () => {
      if (
        (editar.telefono1 === false && form.telefono1 === '')
        || form.telefono1.match(validNumber)
      ) {
        setError({ ...error, telefono1: 'telefono 1 invalido' });
        return false;
      }
      setError({ ...error, telefono1: '' });
      return true;
    },
    telefono2: () => {
      if (
        (editar.telefono2 === false && form.telefono2 === '')
        || form.telefono2.match(validNumber)
      ) {
        setError({ ...error, telefono2: 'telefono 2 invalido' });
        return false;
      }
      setError({ ...error, telefono2: '' });
      return true;
    },
    nombre: () => {
      if (
        (editar.nombre === false && form.director.persona.nombre === '')
        || form.director.persona.nombre === ''
      ) {
        setError({ ...error, nombre: '' });
        return true;
      }
      setError({ ...error, nombre: 'Nombre invalido' });
      return false;
    },
    apellidoPaterno: () => {
      if (
        (editar.apellidoPaterno === false
          && form.director.persona.apellidoPaterno === '')
        || form.director.persona.apellidoPaterno === ''
      ) {
        setError({ ...error, apellidoPaterno: '' });
        return true;
      }
      setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
      return false;
    },
    apellidoMaterno: () => {
      if (
        (editar.apellidoMaterno === false
          && form.director.persona.apellidoMaterno === '')
        || form.director.persona.apellidoMaterno === ''
      ) {
        setError({ ...error, apellidoMaterno: '' });
        return true;
      }
      setError({ ...error, apellidoMaterno: 'Apellido Materno invalido' });
      return false;
    },
    nacionalidad: () => {
      if (
        (editar.nacionalidad === false
          && form.director.persona.nacionalidad === '')
        || form.director.persona.nacionalidad === ''
      ) {
        setError({ ...error, nacionalidad: '' });
        return true;
      }
      setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
      return false;
    },
    curp: () => {
      if (
        editar.curp === false
        && form.director.persona.curp !== ''
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
        || form.director.persona.sexo === ''
      ) {
        setError({ ...error, sexo: 'Genero invalido' });
        return false;
      }
      setError({ ...error, sexo: '' });
      return true;
    },
    correoPrimario: () => {
      if (
        (editar.correoPrimario === false
          && form.director.persona.correoPrimario !== '')
        || form.director.persona.correoPrimario.match(validEmail)
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
