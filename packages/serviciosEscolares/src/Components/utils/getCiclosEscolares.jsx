import { getToken } from '@siiges-ui/shared';

export default async function getCiclosEscolares(id) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const response = await fetch(
    `${url}/api/v1/ciclosEscolares/programas/${id}`,
    { headers: { api_key: apikey, Authorization: `Bearer ${token}` } },
  );

  const data = await response.json();
  return data.data || [];
}
