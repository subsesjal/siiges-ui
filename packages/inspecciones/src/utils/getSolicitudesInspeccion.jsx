import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function getSolicitudesInspecciones() {
  const { session } = useContext(Context);
  const token = getToken();
  const [solicitudesInspecciones, setSolicitudesInspecciones] = useState();
  const [loading, setLoading] = useState(true);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (session !== undefined) {
        try {
          const responseEstatus6 = await fetch(`${url}/api/v1/solicitudes/?estatus=6`, {
            headers: {
              method: 'GET',
              api_key: apikey,
              Authorization: `Bearer ${token}`,
            },
          });
          const dataEstatus6 = await responseEstatus6.json();

          const responseEstatus7 = await fetch(`${url}/api/v1/solicitudes/?estatus=7`, {
            headers: {
              method: 'GET',
              api_key: apikey,
              Authorization: `Bearer ${token}`,
            },
          });
          const dataEstatus7 = await responseEstatus7.json();

          const combinedData = [...dataEstatus6.data, ...dataEstatus7.data];
          setSolicitudesInspecciones(combinedData);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching solicitudes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSolicitudes();
  }, [session]);

  return {
    solicitudesInspecciones,
    loading,
  };
}
