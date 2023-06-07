export default function deleteUser(id) {
  fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
    method: 'DELETE',
    headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
  });
}
