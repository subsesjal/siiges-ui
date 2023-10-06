import { getToken } from '@siiges-ui/shared';

export default function deleteInstitucion(id) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  fetch(`${url}/api/v1/instituciones/${id}`, {
    method: 'DELETE',
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  });
}
