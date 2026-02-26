export default function plantelErrors(form, setError) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const validNumber = /^[0-9]+$/;

  const errors = {
    calle: (valueParam) => {
      const value = valueParam ?? form.domicilio?.calle;

      if (!value) {
        setError((prev) => ({ ...prev, calle: '¡Calle inválida!' }));
        return false;
      }

      setError((prev) => ({ ...prev, calle: '' }));
      return true;
    },

    numeroExterior: (valueParam) => {
      const value = valueParam ?? form.domicilio?.numeroExterior;

      if (!value) {
        setError((prev) => ({
          ...prev,
          numeroExterior: '¡Número exterior inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, numeroExterior: '' }));
      return true;
    },

    colonia: (valueParam) => {
      const value = valueParam ?? form.domicilio?.colonia;

      if (!value) {
        setError((prev) => ({ ...prev, colonia: '¡Colonia inválida!' }));
        return false;
      }

      setError((prev) => ({ ...prev, colonia: '' }));
      return true;
    },

    codigoPostal: (valueParam) => {
      const value = valueParam ?? form.domicilio?.codigoPostal;

      if (!value) {
        setError((prev) => ({
          ...prev,
          codigoPostal: '¡Código postal inválido!',
        }));
        return false;
      }

      if (!validNumber.test(String(value))) {
        setError((prev) => ({
          ...prev,
          codigoPostal: '¡Ingrese solo números!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, codigoPostal: '' }));
      return true;
    },

    municipioId: (valueParam) => {
      const value = valueParam ?? form.domicilio?.municipioId;

      if (!value) {
        setError((prev) => ({
          ...prev,
          municipioId: '¡Por favor seleccione un municipio!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, municipioId: '' }));
      return true;
    },

    tipoInmuebleId: (valueParam) => {
      const value = valueParam ?? form.tipoInmuebleId;

      if (!value) {
        setError((prev) => ({
          ...prev,
          tipoInmuebleId: '¡Por favor seleccione un tipo de inmueble!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, tipoInmuebleId: '' }));
      return true;
    },

    correo1: (valueParam) => {
      const value = valueParam ?? form.correo1;

      if (!value || !validEmail.test(value)) {
        setError((prev) => ({
          ...prev,
          correo1: '¡Correo institucional inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, correo1: '' }));
      return true;
    },

    correo2: (valueParam) => {
      const value = valueParam ?? form.correo2;

      if (!value || !validEmail.test(value)) {
        setError((prev) => ({
          ...prev,
          correo2: '¡Correo de contacto inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, correo2: '' }));
      return true;
    },

    correo3: (valueParam) => {
      const value = valueParam ?? form.correo3;

      if (value && !validEmail.test(value)) {
        setError((prev) => ({
          ...prev,
          correo3: '¡Correo secundario inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, correo3: '' }));
      return true;
    },

    telefono1: (valueParam) => {
      const value = valueParam ?? form.telefono1;

      if (!value) {
        setError((prev) => ({
          ...prev,
          telefono1: '¡Teléfono 1 es obligatorio!',
        }));
        return false;
      }

      if (!/^\d{10}$/.test(value)) {
        setError((prev) => ({
          ...prev,
          telefono1: '¡Debe contener exactamente 10 dígitos numéricos!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, telefono1: '' }));
      return true;
    },

    telefono2: (valueParam) => {
      const value = valueParam ?? form.telefono2;

      if (!value) {
        setError((prev) => ({
          ...prev,
          telefono2: '¡Teléfono 2 es obligatorio!',
        }));
        return false;
      }

      if (!/^\d{10}$/.test(value)) {
        setError((prev) => ({
          ...prev,
          telefono2: '¡Debe contener exactamente 10 dígitos numéricos!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, telefono2: '' }));
      return true;
    },

    claveCentroTrabajo: (valueParam) => {
      const value = valueParam ?? form.claveCentroTrabajo;

      if (!value) {
        setError((prev) => ({
          ...prev,
          claveCentroTrabajo:
            '¡Clave de centro de trabajo inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, claveCentroTrabajo: '' }));
      return true;
    },

    nombre: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.nombre;

      if (!value) {
        setError((prev) => ({ ...prev, nombre: '¡Nombre inválido!' }));
        return false;
      }

      setError((prev) => ({ ...prev, nombre: '' }));
      return true;
    },

    apellidoPaterno: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.apellidoPaterno;

      if (!value) {
        setError((prev) => ({
          ...prev,
          apellidoPaterno: '¡Primer Apellido inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, apellidoPaterno: '' }));
      return true;
    },

    apellidoMaterno: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.apellidoMaterno;

      if (!value) {
        setError((prev) => ({
          ...prev,
          apellidoMaterno: '¡Segundo Apellido inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, apellidoMaterno: '' }));
      return true;
    },

    nacionalidad: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.nacionalidad;

      if (!value) {
        setError((prev) => ({
          ...prev,
          nacionalidad: '¡Nacionalidad inválida!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, nacionalidad: '' }));
      return true;
    },

    curp: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.curp;

      if (!value || value.length !== 18) {
        setError((prev) => ({
          ...prev,
          curp: '¡La CURP debe contener 18 caracteres!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, curp: '' }));
      return true;
    },

    sexo: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.sexo;

      if (!value) {
        setError((prev) => ({ ...prev, sexo: '¡Género inválido!' }));
        return false;
      }

      setError((prev) => ({ ...prev, sexo: '' }));
      return true;
    },

    correoPrimario: (valueParam) => {
      const value = valueParam ?? form.director?.persona?.correoPrimario;

      if (!value || !validEmail.test(value)) {
        setError((prev) => ({
          ...prev,
          correoPrimario: '¡Correo inválido!',
        }));
        return false;
      }

      setError((prev) => ({ ...prev, correoPrimario: '' }));
      return true;
    },
  };

  return errors;
}
