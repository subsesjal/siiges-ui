export default function plantelErrors(form, setError, error) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^[0-9]+$/;

  const errors = {
    calle: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.domicilio.calle === undefined || form.domicilio.calle === '') {
        setError({ ...error, calle: 'Calle invalida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.domicilio.numeroExterior === undefined || form.domicilio.numeroExterior === '') {
        setError({ ...error, numeroExterior: 'Numero exterior invalido' });
        return false;
      }
      setError({ ...error, numeroExterior: '' });
      return true;
    },
    colonia: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.domicilio.colonia === undefined || form.domicilio.colonia === '') {
        setError({ ...error, colonia: 'Colonia invalida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.domicilio.codigoPostal === undefined || form.domicilio.codigoPostal === '') {
        setError({
          ...error,
          codigoPostal: 'Codigo postal invalido',
        });
        return false;
      }
      if (value
        ? value === undefined || value === ''
        : !String(form.domicilio.codigoPostal).match(validNumber)) {
        setError({
          ...error,
          codigoPostal: 'Ingrese solo numeros',
        });
        return false;
      }
      setError({ ...error, codigoPostal: '' });
      return true;
    },
    municipioId: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.domicilio.municipioId === undefined || form.domicilio.municipioId === '') {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.tipoInmuebleId === undefined || form.tipoInmuebleId === '') {
        setError({
          ...error,
          tipoInmuebleId: 'Seleccione un tipo de inmueble',
        });
        return false;
      }
      setError({ ...error, tipoInmuebleId: '' });
      return true;
    },
    correo1: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.correo1 === undefined || form.correo1 === '' || !form.correo1.match(validEmail)) {
        setError({ ...error, correo1: 'Correo institucional invalido' });
        return false;
      }
      setError({ ...error, correo1: '' });
      return true;
    },
    correo2: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.correo2 === undefined || form.correo2 === '' || !form.correo2.match(validEmail)) {
        setError({ ...error, correo2: 'Correo de contacto invalido' });
        return false;
      }
      setError({ ...error, correo2: '' });
      return true;
    },
    correo3: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.correo3 !== '' && !form.correo3.match(validEmail)) {
        setError({ ...error, correo3: 'Correo secundario invalido' });
        return false;
      }
      setError({ ...error, correo3: '' });
      return true;
    },
    telefono1: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.telefono1 === undefined || form.telefono1 === '' || !form.telefono1.match(validNumber)) {
        setError({ ...error, telefono1: 'telefono 1 invalido' });
        return false;
      }
      if (value
        ? value === undefined || value === ''
        : form.telefono1.length !== 10) {
        setError({ ...error, telefono1: 'Ingrese 10 digitos' });
        return false;
      }
      setError({ ...error, telefono1: '' });
      return true;
    },
    telefono2: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.telefono2 === undefined || form.telefono2 === '' || !form.telefono2.match(validNumber)) {
        setError({ ...error, telefono2: 'telefono 2 invalido' });
        return false;
      }
      if (value
        ? value === undefined || value === ''
        : form.telefono2.length !== 10) {
        setError({ ...error, telefono2: 'Ingrese 10 digitos' });
        return false;
      }
      setError({ ...error, telefono2: '' });
      return true;
    },
    nombre: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.nombre === undefined || form.director.persona.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.apellidoPaterno === undefined || form.director.persona.apellidoPaterno === '') {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.apellidoMaterno === undefined || form.director.persona.apellidoMaterno === '') {
        setError({ ...error, apellidoMaterno: 'Apellido Materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nacionalidad: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.nacionalidad === undefined || form.director.persona.nacionalidad === '') {
        setError({ ...error, nacionalidad: 'Nacionalidad invalida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
    curp: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.curp === undefined || form.director.persona.curp === '' || form.director.persona.curp.length !== 18) {
        setError({ ...error, curp: 'Curp debe tener 18 caracteres' });
        return false;
      }
      setError({ ...error, curp: '' });
      return true;
    },
    sexo: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.sexo === undefined || form.director.persona.sexo === '') {
        setError({ ...error, sexo: 'Genero invalido' });
        return false;
      }
      setError({ ...error, sexo: '' });
      return true;
    },
    correoPrimario: (value) => {
      if (value
        ? value === undefined || value === ''
        : form.director.persona.correoPrimario === undefined || form.director.persona.correoPrimario === '' || !form.director.persona.correoPrimario.match(validEmail)) {
        setError({ ...error, correoPrimario: 'Correo invalido' });
        return false;
      }
      setError({ ...error, correoPrimario: '' });
      return true;
    },
  };

  return errors;
}
