import { getToken } from '@siiges-ui/shared';

export default async function grupoService({ id, dataBody }) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const endpoint = id ? `${url}/api/v1/grupos/${id}` : `${url}/api/v1/grupos/`;
  const method = id ? 'PATCH' : 'POST';

  const response = await fetch(endpoint, {
    method,
    body: JSON.stringify(dataBody),
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
  });

  const result = await response.text();
  const { data } = JSON.parse(result);
  return data;
}
