import { getToken } from '@siiges-ui/shared';

export default function deletePlantel(institucion, id, handleDeleteClick) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  fetch(
    `${url}/api/v1/instituciones/${institucion}/planteles/${id}`,
    {
      method: 'DELETE',
      headers: { api_key: apikey, Authorization: `Bearer ${token}` },
    },
  ).then(handleDeleteClick(id));
}
