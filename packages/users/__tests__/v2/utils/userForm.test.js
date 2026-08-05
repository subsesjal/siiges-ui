import {
  buildEmptyUserForm,
  mapUserToForm,
  normalizeUpdatePayload,
  getUserDisplayName,
  buildChangedUpdatePayload,
} from '../../../v2/utils/userForm';

describe('userForm - buildEmptyUserForm', () => {
  it('returns a form with empty persona fields', () => {
    const form = buildEmptyUserForm();
    expect(form.persona.nombre).toBe('');
    expect(form.persona.apellidoPaterno).toBe('');
    expect(form.persona.rfc).toBe('');
    expect(form.persona.curp).toBe('');
    expect(form.correo).toBe('');
    expect(form.usuario).toBe('');
    expect(form.estatus).toBe(1);
    expect(form.actualizado).toBe(1);
  });
});

describe('userForm - mapUserToForm', () => {
  it('returns empty form when user is null', () => {
    const form = mapUserToForm(null, 'admin');
    expect(form.persona.nombre).toBe('');
  });

  it('maps user data to form correctly', () => {
    const user = {
      id: 5,
      correo: 'user@test.com',
      usuario: 'testuser',
      estatus: 1,
      actualizado: 1,
      rol: { id: 2 },
      persona: {
        nombre: 'Maria',
        apellidoPaterno: 'Lopez',
        apellidoMaterno: 'Gomez',
        sexo: 'Femenino',
        nacionalidad: 'Mexicana',
        rfc: 'LOGG9001012H9',
        curp: 'LOGG900101MDFPXX01',
        celular: '5599887766',
        telefono: '5588776655',
        tituloCargo: 'Directora',
      },
    };
    const form = mapUserToForm(user, 'admin');
    expect(form.id).toBe(5);
    expect(form.correo).toBe('user@test.com');
    expect(form.rolId).toBe('2');
    expect(form.persona.nombre).toBe('Maria');
    expect(form.persona.rfc).toBe('LOGG9001012H9');
    expect(form.persona.curp).toBe('LOGG900101MDFPXX01');
  });

  it('sets rolId from user.rolId when rol.id is absent', () => {
    const user = {
      id: 1,
      correo: 'a@b.com',
      rolId: 3,
      persona: {},
    };
    const form = mapUserToForm(user, 'admin');
    expect(form.rolId).toBe('3');
  });

  it('sets rolId to empty string when both are absent', () => {
    const user = { id: 1, correo: 'a@b.com', persona: {} };
    const form = mapUserToForm(user, 'admin');
    expect(form.rolId).toBe('');
  });
});

describe('userForm - normalizeUpdatePayload', () => {
  it('builds payload with numeric rolId when provided', () => {
    const form = {
      correo: 'x@x.com',
      rolId: '2',
      estatus: '1',
      persona: {
        nombre: 'A',
        apellidoPaterno: 'B',
        apellidoMaterno: 'C',
        sexo: 'M',
        nacionalidad: 'MX',
        rfc: '',
        curp: '',
        celular: '',
        telefono: '',
        tituloCargo: '',
      },
    };
    const payload = normalizeUpdatePayload(form);
    expect(payload.rolId).toBe(2);
    expect(payload.estatus).toBe(1);
    expect(payload.correo).toBe('x@x.com');
    expect(payload.persona.nombre).toBe('A');
  });

  it('omits rolId when empty string', () => {
    const form = { correo: 'x@x.com', rolId: '', persona: {} };
    const payload = normalizeUpdatePayload(form);
    expect(payload.rolId).toBeUndefined();
  });

  it('omits estatus when empty string', () => {
    const form = { correo: 'x@x.com', estatus: '', persona: {} };
    const payload = normalizeUpdatePayload(form);
    expect(payload.estatus).toBeUndefined();
  });
});

describe('userForm - getUserDisplayName', () => {
  it('returns full name correctly', () => {
    const user = {
      persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'Garcia' },
    };
    expect(getUserDisplayName(user)).toBe('Juan Perez Garcia');
  });

  it('handles missing apellidoMaterno', () => {
    const user = { persona: { nombre: 'Ana', apellidoPaterno: 'Lopez', apellidoMaterno: '' } };
    expect(getUserDisplayName(user)).toBe('Ana Lopez');
  });

  it('returns empty string for null user', () => {
    expect(getUserDisplayName(null)).toBe('');
  });
});

describe('userForm - buildChangedUpdatePayload', () => {
  const initialUser = {
    id: 12,
    actualizado: 1,
    correo: 'base@test.com',
    rol: { id: 3 },
    estatus: 1,
    persona: {
      nombre: 'Base',
      apellidoPaterno: 'Usuario',
      apellidoMaterno: 'Demo',
      sexo: '',
      nacionalidad: '',
      rfc: '',
      curp: '',
      celular: '',
      telefono: '',
      tituloCargo: 'Representante',
    },
  };

  it('returns empty object when nothing changed', () => {
    const candidatePayload = normalizeUpdatePayload(mapUserToForm(initialUser, 'admin'));

    const result = buildChangedUpdatePayload({
      initialUser,
      candidatePayload,
      sessionRole: 'admin',
    });

    expect(result).toEqual({});
  });

  it('returns only changed root fields', () => {
    const result = buildChangedUpdatePayload({
      initialUser,
      candidatePayload: {
        actualizado: 1,
        correo: 'changed@test.com',
        rolId: 7,
        estatus: 0,
        persona: {
          nombre: 'Base',
          apellidoPaterno: 'Usuario',
          apellidoMaterno: 'Demo',
          sexo: '',
          nacionalidad: '',
          rfc: '',
          curp: '',
          celular: '',
          telefono: '',
          tituloCargo: 'Representante',
        },
      },
      sessionRole: 'admin',
    });

    expect(result).toEqual({
      correo: 'changed@test.com',
      rolId: 7,
      estatus: 0,
    });
  });

  it('returns only changed persona subfields', () => {
    const result = buildChangedUpdatePayload({
      initialUser,
      candidatePayload: {
        actualizado: 1,
        correo: 'base@test.com',
        rolId: 3,
        estatus: 1,
        persona: {
          nombre: 'Nuevo',
          apellidoPaterno: 'Usuario',
          apellidoMaterno: 'Demo',
          sexo: '',
          nacionalidad: '',
          rfc: '',
          curp: '',
          celular: '5512345678',
          telefono: '',
          tituloCargo: 'Representante',
        },
      },
      sessionRole: 'admin',
    });

    expect(result).toEqual({
      persona: {
        nombre: 'Nuevo',
        celular: '5512345678',
      },
    });
  });
});
