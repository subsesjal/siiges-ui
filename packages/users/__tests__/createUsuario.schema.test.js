import { createUsuarioSchema } from '../src/schemas/createUsuario.schema';

describe('createUsuarioSchema', () => {
  it('defines rolId as number to match normalized submit payload', () => {
    expect(createUsuarioSchema.properties.rolId).toEqual({ type: 'number' });
  });

  it('keeps required fields for create flow', () => {
    expect(createUsuarioSchema.required).toEqual(
      expect.arrayContaining([
        'persona',
        'rolId',
        'correo',
        'usuario',
        'contrasena',
        'repeatContrasena',
        'actualizado',
      ]),
    );
  });

  it('keeps password constraints in both password fields', () => {
    expect(createUsuarioSchema.properties.contrasena.minLength).toBe(8);
    expect(createUsuarioSchema.properties.contrasena.maxLength).toBe(25);
    expect(createUsuarioSchema.properties.repeatContrasena.pattern).toBe(
      createUsuarioSchema.properties.contrasena.pattern,
    );
  });
});
