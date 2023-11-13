import { getToken } from '@siiges-ui/shared';

export default function getCiclosEscolares(programaId, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  fetch(`${url}/api/v1/ciclosEscolares/programas/${programaId}`, {
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(null, { ciclosEscolares: data.data });
    })
    .catch((error) => {
      callback(error);
    });
}
