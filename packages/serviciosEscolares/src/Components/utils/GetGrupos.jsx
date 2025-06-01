import { getToken } from '@siiges-ui/shared';

export default async function useGrupos(ciclosEscolarId, gradoId) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const response = await fetch(
    `${url}/api/v1/grupos/ciclosEscolares/${ciclosEscolarId}/grados/${gradoId}`,
    { headers: { api_key: apikey, Authorization: `Bearer ${token}` } },
  );
  const data = await response.json();
  return data.data || [];
}
