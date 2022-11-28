export default function userErrors(form, setError, error) {
  const errors = {
    nombre: () => {
      if (form.persona.nombre === undefined || form.persona.nombre === '') {
        setError({ ...error, nombre: 'Nombre invalido' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    apellidoPaterno: () => {
      if (
        form.persona.apellidoPaterno === undefined
        || form.persona.apellidoPaterno === ''
      ) {
        setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        return false;
      }
      setError({ ...error, apellidoPaterno: '' });
      return true;
    },
    apellidoMaterno: () => {
      if (
        form.persona.apellidoMaterno === undefined
        || form.persona.apellidoMaterno === ''
      ) {
        setError({ ...error, apellidoMaterno: 'Apellido materno invalido' });
        return false;
      }
      setError({ ...error, apellidoMaterno: '' });
      return true;
    },
    tituloCargo: () => {
      if (
        form.persona.tituloCargo === undefined
        || form.persona.tituloCargo === ''
      ) {
        setError({ ...error, tituloCargo: 'Cargo invalido' });
        return false;
      }
      setError({ ...error, tituloCargo: '' });
      return true;
    },
    correo: () => {
      if (form.correo === undefined || form.correo === '') {
        setError({ ...error, correo: 'Correo invalido' });
        return false;
      }
      setError({ ...error, correo: '' });
      return true;
    },
    usuario: () => {
      if (form.usuario === undefined || form.usuario === '') {
        setError({ ...error, usuario: 'Usuario invalido' });
        return false;
      }
      setError({ ...error, usuario: '' });
      return true;
    },
    contrasena: () => {
      if (form.contrasena === undefined || form.contrasena === '') {
        setError({ ...error, contrasena: 'Contraseña invalida' });
        return false;
      }
      if (
        Object.keys(form.contrasena).length > 0
        && Object.keys(form.contrasena).length <= 4
      ) {
        setError({
          ...error,
          contrasena: 'La contraseña debe contener almenos 4 caracteres',
        });
        return false;
      }
      setError({ ...error, contrasena: '' });
      return true;
    },
    repeatContrasena: () => {
      if (
        form.repeatContrasena !== undefined
        && form.repeatContrasena !== form.contrasena
      ) {
        setError({
          ...error,
          repeatContrasena: 'Las contraseñas deben de ser iguales',
        });
        return false;
      }
      setError({ ...error, repeatContrasena: '' });
      return true;
    },
  };

  return errors;
}
