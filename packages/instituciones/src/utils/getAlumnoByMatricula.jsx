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
      if (data.statusCode && data.statusCode === 404) {
        callback(data, { loading: false });
      }
      if (data.statusCode && data.statusCode !== 200) {
        throw new Error(data.message || 'Error fetching alumno data');
      }
      callback(null, {
        loading: false,
        alumnos: data.data,
      });
    })
    .catch((error) => {
      callback(error, { loading: false });
    });
}
