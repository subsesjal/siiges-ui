import { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';

export default function getSolicitudesById(id) {
  const { session, setNoti } = useContext(Context);
  const [solicitudes, setSolicitudes] = useState({});
  const [loading, setLoading] = useState(true);

  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session && id !== undefined) {
      setLoading(true);
      fetch(`${url}/api/v1/solicitudes/${id}`, {
        method: 'GET',
        headers: {
          api_key: apikey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            setNoti({
              open: true,
              message: 'Algo salió mal al cargar la información',
              type: 'error',
            });
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          setSolicitudes(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [session, id, setNoti]);

  return {
    solicitudes,
    loading,
  };
}
