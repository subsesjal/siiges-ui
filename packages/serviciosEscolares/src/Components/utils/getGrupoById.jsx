import { getToken } from '@siiges-ui/shared';

export default function getGrupoById(grupoId) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  return fetch(`${url}/api/v1/alumnos/grupos/${grupoId}/inscripcion`, {
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.data)
    .catch((error) => {
      console.error('Error fetching data: ', error);
      return null;
    });
}
