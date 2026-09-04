const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_URL;

const getFriendlyValidationMessage = (rawMessage) => {
  const message = String(rawMessage || '');
  const normalized = message.toLowerCase();

  if (normalized.includes('body/persona/rfc')) {
    return 'RFC inválido. Debe contener entre 12 y 13 caracteres.';
  }

  if (normalized.includes('body/persona/curp')) {
    return 'CURP inválida. Debe contener 18 caracteres.';
  }

  if (normalized.includes('body/correo')) {
    return 'Correo electrónico inválido. Verifica el formato (ejemplo@dominio.com).';
  }

  if (normalized.includes('body/persona/celular')) {
    return 'Celular inválido. Debe contener 10 dígitos numéricos.';
  }

  if (normalized.includes('body/persona/telefono')) {
    return 'Teléfono inválido. Debe contener 10 dígitos numéricos.';
  }

  if (normalized.includes('must not have fewer than') || normalized.includes('must not have less than')) {
    return 'Algunos campos no cumplen con la longitud mínima requerida.';
  }

  if (normalized.includes('must not have more than') || normalized.includes('must not have greater than')) {
    return 'Algunos campos exceden la longitud máxima permitida.';
  }

  if (normalized.includes('must match pattern')) {
    return 'Hay campos con formato inválido. Verifica la información capturada.';
  }

  return message;
};

const getAuthHeaders = (token) => {
  const headers = {
    api_key: API_KEY,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async ({
  path,
  token,
  method = 'GET',
  body,
  signal,
  unwrapData = true,
}) => {
  const response = await fetch(`${BASE_URL}/${path}`, {
    method,
    headers: getAuthHeaders(token),
    body: body ? JSON.stringify(body) : null,
    redirect: 'follow',
    signal,
  });

  let payload = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    payload = await response.json();
  }

  if (!response.ok) {
    const rawMessage = payload?.message || response.statusText || 'Error de servicio.';
    throw new Error(getFriendlyValidationMessage(rawMessage));
  }

  return unwrapData ? payload?.data ?? payload : payload;
};

const getUsers = ({
  session,
  signal,
  page,
  limit,
  search,
  sortBy,
  sortOrder,
}) => {
  const query = new URLSearchParams();

  if (page !== undefined) query.set('page', page);
  if (limit !== undefined) query.set('limit', limit);
  if (search) query.set('search', search);
  if (sortBy) query.set('sortBy', sortBy);
  if (sortOrder) query.set('sortOrder', sortOrder);

  const appendQuery = (path) => {
    const queryString = query.toString();
    return queryString ? `${path}?${queryString}` : path;
  };

  if (session?.rol === 'representante') {
    return request({
      path: appendQuery(`api/v1/usuarios/${session.id}/usuarios`),
      token: session.token,
      method: 'GET',
      signal,
      unwrapData: false,
    });
  }

  if (session?.rol === 'admin' || session?.rol === 'sicyt_editar') {
    return request({
      path: appendQuery('api/v1/usuarios'),
      token: session.token,
      method: 'GET',
      signal,
      unwrapData: false,
    });
  }

  return Promise.reject(new Error('Rol no autorizado.'));
};

const getUserById = ({ session, usuarioId, signal }) => request({
  path: `api/v1/usuarios/${usuarioId}`,
  token: session.token,
  method: 'GET',
  signal,
});

const createUser = ({ session, data, signal }) => {
  if (session?.rol === 'representante') {
    return request({
      path: `api/v1/usuarios/${session.id}/usuario`,
      token: session.token,
      method: 'POST',
      body: data,
      signal,
    });
  }

  if (session?.rol === 'admin') {
    return request({
      path: 'api/v1/usuarios',
      token: session.token,
      method: 'POST',
      body: data,
      signal,
    });
  }

  return Promise.reject(new Error('Rol no autorizado para crear usuarios.'));
};

const updateUser = ({
  session,
  usuarioId,
  data,
  signal,
}) => request({
  path: `api/v1/usuarios/${usuarioId}`,
  token: session.token,
  method: 'PATCH',
  body: data,
  signal,
});

const deleteUser = ({
  session,
  usuarioId,
  signal,
}) => {
  if (session?.rol !== 'admin') {
    return Promise.reject(new Error('Rol no autorizado para eliminar usuarios.'));
  }

  return request({
    path: `api/v1/usuarios/${usuarioId}`,
    token: session.token,
    method: 'DELETE',
    signal,
  });
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
