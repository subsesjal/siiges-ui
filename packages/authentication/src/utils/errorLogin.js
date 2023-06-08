export default function errorLogin(form, setError, error) {
  const errors = {
    usuario: () => {
      if (form.usuario === undefined || form.usuario === '') {
        setError({ ...error, usuario: 'Usuario incorrecto' });
        return false;
      }
      setError({ ...error, usuario: '' });
      return true;
    },
    contrasena: () => {
      if (form.contrasena === undefined || form.contrasena === '') {
        setError({ ...error, contrasena: 'Contraseña invalido' });
        return false;
      }
      setError({ ...error, contrasena: '' });
      return true;
    },
  };

  return errors;
}
