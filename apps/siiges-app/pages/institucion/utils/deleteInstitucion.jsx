export default function deleteInstitucion(id) {
  fetch(`http://localhost:3000/api/v1/instituciones/${id}`, {
    method: 'DELETE',
    headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
  });
}
