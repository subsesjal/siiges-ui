export default function plantelErrors(form, setError, error) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validNumber = /^[0-9]+$/;

  const errors = {
    calle: () => {
      if (form.domicilio.calle === undefined || form.domicilio.calle === '') {
        setError({ ...error, calle: 'Calle inválida' });
        return false;
      }
      setError({ ...error, calle: '' });
      return true;
    },
    numeroExterior: () => {
      if (form.domicilio.numeroExterior === undefined || form.domicilio.numeroExterior === '') {
        setError({ ...error, numeroExterior: 'Número exterior inválido' });
        return false;
      }
      setError({ ...error, numeroExterior: '' });
      return true;
    },
    colonia: () => {
      if (form.domicilio.colonia === undefined || form.domicilio.colonia === '') {
        setError({ ...error, colonia: 'Colonia inválida' });
        return false;
      }
      setError({ ...error, colonia: '' });
      return true;
    },
    codigoPostal: () => {
      if (form.domicilio.codigoPostal === undefined || form.domicilio.codigoPostal === '') {
        setError({
          ...error,
          codigoPostal: 'Código postal inválido',
        });
        return false;
      }
      if (!String(form.domicilio.codigoPostal).match(validNumber)) {
        setError({
          ...error,
          codigoPostal: 'Ingrese solo numeros',
        });
        return false;
      }
      setError({ ...error, codigoPostal: '' });
      return true;
    },
    municipioId: () => {
      if (form.domicilio.municipioId === undefined || form.domicilio.municipioId === '') {
        setError({ ...error, municipioId: 'Seleccione un municipio' });
        return false;
      }
      setError({ ...error, municipioId: '' });
      return true;
    },
    tipoInmuebleId: () => {
      if (form.tipoInmuebleId === undefined || form.tipoInmuebleId === '') {
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
      if (form.correo1 === undefined || form.correo1 === '' || !form.correo1.match(validEmail)) {
        setError({ ...error, correo1: 'Correo institucional inválido' });
        return false;
      }
      setError({ ...error, correo1: '' });
      return true;
    },
    correo2: () => {
      if (form.correo2 === undefined || form.correo2 === '' || !form.correo2.match(validEmail)) {
        setError({ ...error, correo2: 'Correo de contacto inválido' });
        return false;
      }
      setError({ ...error, correo2: '' });
      return true;
    },
    correo3: () => {
      if (form.correo3 !== undefined && form.correo3 !== '' && !form.correo3.match(validEmail)) {
        setError({ ...error, correo3: 'Correo secundario inválido' });
        return false;
      }
      setError({ ...error, correo3: '' });
      return true;
    },
    telefono1: () => {
      if (form.telefono1 === undefined || form.telefono1 === '' || !form.telefono1.match(validNumber)) {
        setError({ ...error, telefono1: 'teléfono 1 inválido' });
        return false;
      }
      if (form.telefono1.length !== 10) {
        setError({ ...error, telefono1: 'Ingrese 10 dígitos' });
        return false;
      }
      setError({ ...error, telefono1: '' });
      return true;
    },
    telefono2: () => {
      if (form.telefono2 === undefined || form.telefono2 === '' || !form.telefono2.match(validNumber)) {
        setError({ ...error, telefono2: 'teléfono 2 inválido' });
        return false;
      }
      if (form.telefono2.length !== 10) {
        setError({ ...error, telefono2: 'Ingrese 10 dígitos' });
        return false;
      }
      setError({ ...error, telefono2: '' });
      return true;
    },
    nombre: () => {
      if (form.director.persona.nombre === undefined || form.director.persona.nombre === '') {
        setError({ ...error, nombre: 'Nombre inválido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (form.director.persona.apellidoPaterno === undefined || form.director.persona.apellidoPaterno === '') {
        setError({ ...error, apellidoPaterno: 'Primer Apellido inválido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (form.director.persona.apellidoMaterno === undefined || form.director.persona.apellidoMaterno === '') {
        setError({ ...error, apellidoMaterno: 'Segundo Apellido inválido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    nacionalidad: () => {
      if (form.director.persona.nacionalidad === undefined || form.director.persona.nacionalidad === '') {
        setError({ ...error, nacionalidad: 'Nacionalidad inválida' });
        return false;
      }
      setError({ ...error, nacionalidad: '' });
      return true;
    },
    curp: () => {
      if (form.director.persona.curp === undefined || form.director.persona.curp === '' || form.director.persona.curp.length !== 18) {
        setError({ ...error, curp: 'Curp debe tener 18 caracteres' });
        return false;
      }
      setError({ ...error, curp: '' });
      return true;
    },
    sexo: () => {
      if (form.director.persona.sexo === undefined || form.director.persona.sexo === '') {
        setError({ ...error, sexo: 'Género inválido' });
        return false;
      }
      setError({ ...error, sexo: '' });
      return true;
    },
    correoPrimario: () => {
      if (form.director.persona.correoPrimario === undefined || form.director.persona.correoPrimario === '' || !form.director.persona.correoPrimario.match(validEmail)) {
        setError({ ...error, correoPrimario: 'Correo inválido' });
        return false;
      }
      setError({ ...error, correoPrimario: '' });
      return true;
    },
  };

  return errors;
}
