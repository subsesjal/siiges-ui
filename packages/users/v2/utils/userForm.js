const buildEmptyUserForm = () => ({
  actualizado: 1,
  persona: {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    nacionalidad: '',
    rfc: '',
    curp: '',
    celular: '',
    telefono: '',
    tituloCargo: '',
  },
  rolId: '',
  correo: '',
  usuario: '',
  contrasena: '',
  repeatContrasena: '',
  estatus: 1,
});

const mapUserToForm = (user, sessionRole) => {
  if (!user) return buildEmptyUserForm(sessionRole);

  const persona = user.persona || {};
  const roleId = user.rol?.id ?? user.rolId;

  return {
    id: user.id,
    actualizado: user.actualizado ?? 1,
    persona: {
      nombre: persona.nombre || '',
      apellidoPaterno: persona.apellidoPaterno || '',
      apellidoMaterno: persona.apellidoMaterno || '',
      sexo: persona.sexo || '',
      nacionalidad: persona.nacionalidad || '',
      rfc: persona.rfc || '',
      curp: persona.curp || '',
      celular: persona.celular || '',
      telefono: persona.telefono || '',
      tituloCargo: persona.tituloCargo || '',
    },
    rolId: roleId !== undefined && roleId !== null ? String(roleId) : '',
    correo: user.correo || '',
    usuario: user.usuario || '',
    estatus: user.estatus ?? 1,
  };
};

const getUserDisplayName = (user) => {
  const persona = user?.persona || {};
  return `${persona.nombre || ''} ${persona.apellidoPaterno || ''} ${persona.apellidoMaterno || ''}`.replace(/\s+/g, ' ').trim();
};

const normalizeUpdatePayload = (form) => {
  const payload = {
    actualizado: Number(form.actualizado ?? 1),
    persona: {
      nombre: form.persona?.nombre || '',
      apellidoPaterno: form.persona?.apellidoPaterno || '',
      apellidoMaterno: form.persona?.apellidoMaterno || '',
      sexo: form.persona?.sexo || '',
      nacionalidad: form.persona?.nacionalidad || '',
      rfc: form.persona?.rfc || '',
      curp: form.persona?.curp || '',
      celular: form.persona?.celular || '',
      telefono: form.persona?.telefono || '',
      tituloCargo: form.persona?.tituloCargo || '',
    },
    correo: form.correo || '',
  };

  if (form.rolId !== '' && form.rolId !== undefined && form.rolId !== null) {
    payload.rolId = Number(form.rolId);
  }

  if (form.estatus !== '' && form.estatus !== undefined && form.estatus !== null) {
    payload.estatus = Number(form.estatus);
  }

  return payload;
};

export {
  buildEmptyUserForm,
  mapUserToForm,
  getUserDisplayName,
  normalizeUpdatePayload,
};
