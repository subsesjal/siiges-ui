import { getToken } from '@siiges-ui/shared';

export default function getAlumnoByMatricula(matricula, programaId, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  fetch(`${url}/api/v1/alumnos/programas/${programaId}?matricula=${matricula}`, {
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(null, { alumnos: data.data, loading: false });
    })
    .catch((error) => {
      callback(error, { loading: false });
    });
}
