import { getToken } from '@siiges-ui/shared';

export default function getGrupoById(grupoId) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  return fetch(`${url}/api/v1/grupos/${grupoId}`, {
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`¡Error en el estatus HTTP!: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.data)
    .catch((error) => {
      console.error('¡Error al obtener datos!: ', error);
      return null;
    });
}
