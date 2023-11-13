import { getToken } from '@siiges-ui/shared';

export default function getProgramas(plantelId, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  fetch(`${url}/api/v1/programas/planteles/${plantelId}`, {
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(null, { programas: data.data, loading: false });
    })
    .catch((error) => {
      callback(error, { loading: false });
    });
}
