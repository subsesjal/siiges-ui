const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_URL;

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
    throw new Error(payload?.message || response.statusText || 'Error de servicio.');
  }

  return payload?.data ?? payload;
};

const getUsers = ({ session, signal }) => {
  if (session?.rol === 'representante') {
    return request({
      path: `api/v1/usuarios/${session.id}/usuarios`,
      token: session.token,
      method: 'GET',
      signal,
    });
  }

  if (session?.rol === 'admin' || session?.rol === 'sicyt_editar') {
    return request({
      path: 'api/v1/usuarios',
      token: session.token,
      method: 'GET',
      signal,
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

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
