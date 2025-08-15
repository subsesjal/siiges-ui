import { getToken } from '@siiges-ui/shared';

export default async function updateCiclosEscolares({ id, dataBody }, onSuccess) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const response = await fetch(`${url}/api/v1/ciclosEscolares/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dataBody),
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const result = await response.text();

  const { data } = JSON.parse(result);
  onSuccess?.();

  return data;
}
