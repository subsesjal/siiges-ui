import { getToken } from '@siiges-ui/shared';

export default async function submitCalificaciones(
  calificaciones,
  setNoti,
  grupoId,
  asignaturaId,
  tipo,
  setResponse,
) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  try {
    const response = await fetch(
      `${url}/api/v1/calificaciones/grupos/${grupoId}/asignaturas/${asignaturaId}?tipo=${tipo}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(calificaciones),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setResponse(data);

    setNoti({
      open: true,
      message: 'Carga de calificaciones exitoso',
      type: 'success',
    });
  } catch (err) {
    console.error('Error:', err);
    setNoti({
      open: true,
      message: 'Algo salio mal, revise que la información este correcta',
      type: 'error',
    });
  }
}
