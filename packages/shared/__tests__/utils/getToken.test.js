import getTokenLocalStorage from '../../src/utils/handlers/getToken';

function createToken(payloadObject) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify(payloadObject)).toString('base64url');
  return `${header}.${payload}.signature`;
}

describe('getTokenLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when token is not present', () => {
    expect(getTokenLocalStorage()).toBeNull();
  });

  it('returns parsed session with estatus when token is valid', () => {
    const jwtPayload = {
      exp: Math.floor(Date.now() / 1000) + 120,
      id: 100,
      usuario: 'demo',
      rol: 'representante',
      estatus: true,
    };
    const token = createToken(jwtPayload);
    localStorage.setItem('token', JSON.stringify(token));

    const session = getTokenLocalStorage();

    expect(session).toEqual({
      id: 100,
      nombre: 'demo',
      rol: 'representante',
      estatus: true,
      token,
    });
  });

  it('returns null and clears storage for expired token', () => {
    const token = createToken({
      exp: Math.floor(Date.now() / 1000) - 10,
      id: 100,
      usuario: 'demo',
      rol: 'representante',
      estatus: true,
    });
    localStorage.setItem('token', JSON.stringify(token));

    expect(getTokenLocalStorage()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
