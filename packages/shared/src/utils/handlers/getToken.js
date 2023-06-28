/**
 * The objective of the function is to retrieve a JSON Web Token (JWT)
 * from the local storage, parse it,
 * and return relevant user data if the token is valid and not expired.
 * @param {String} token - a JWT string stored in the local storage.
 * @returns {Object} JSON Web Token an object containing user data such as id, name, role, and token
 */
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
/**
 * The objective of the function is to retrieve the JWT token from the local storage, parse it,
 * and return the user data associated with the token if it is valid.
 * @returns {Object} A data object containing the user ID, name,
 * role, and token if the token is valid.
 * Null if the token is not present or has expired
 * @example
 * const data = {
 *  id: 1,
 *  nombre: Daniel,
 *  rol: admin,
 *  token: 'j2iofh2i3h2724b2d2u,
 *};
 */
export default function getTokenLocalStorage() {
  const jwt = localStorage.getItem('token');
  if (!jwt) {
    return null;
  }
  const parsedJwt = parseJwt(jwt);
  const { exp, userPayload } = parsedJwt;
  if (exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  const token = JSON.parse(jwt);
  const data = {
    id: userPayload.id,
    nombre: userPayload.usuario,
    rol: userPayload.rol,
    token,
  };
  return data;
}
