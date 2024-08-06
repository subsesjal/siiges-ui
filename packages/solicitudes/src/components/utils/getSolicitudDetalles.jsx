/* eslint-disable consistent-return */
import { getToken } from '@siiges-ui/shared';

export default async function getSolicitudDetalles(id, session, setNoti) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  if (session && id !== undefined) {
    try {
      const response = await fetch(`${url}/api/v1/solicitudes/${id}/detalles`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setNoti({
          open: true,
          message: '¡Algo salió mal al cargar la información!',
          type: 'error',
        });
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
