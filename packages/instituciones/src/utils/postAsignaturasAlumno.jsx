import { getToken } from '@siiges-ui/shared';

export default function postAsignaturasAlumno(asignaturas, grupoId, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  fetch(`${url}/api/v1/alumnos/grupos/${grupoId}/inscripcion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(asignaturas),
  })
    .then((response) => response.json())
    .then((data) => {
      callback(null, { alumnos: data.data, loading: false });
    })
    .catch((error) => {
      callback(error, { loading: false });
    });
}
