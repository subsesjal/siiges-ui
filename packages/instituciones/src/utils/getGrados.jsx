import { getToken } from '@siiges-ui/shared';

export default function getGrados(programaId, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  fetch(`${url}/api/v1/grados/programas/${programaId}`, {
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(null, { grados: data.data, loading: false });
    })
    .catch((error) => {
      callback(error, { loading: false });
    });
}
