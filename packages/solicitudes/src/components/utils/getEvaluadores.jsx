import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function getEvaluadores() {
  const { session, setNoti } = useContext(Context);
  const token = getToken();

  const [evaluadores, setEvaluadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session) {
      setLoading(true);

      fetch(`${url}/api/v1/evaluaciones/evaluadores`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setEvaluadores(data.data || []);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          setNoti({
            open: true,
            message: '¡Algo salió mal al cargar evaluadores!',
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session]);

  return {
    evaluadores,
    loading,
  };
}
