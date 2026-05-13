import { useEffect, useState } from 'react';
import { getToken, useAuth } from '@siiges-ui/shared';

export default function getInspector() {
  const { session } = useAuth();
  const token = getToken();
  const [inspector, setInspector] = useState({});
  const [loading, setLoading] = useState(true);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session !== undefined) {
      fetch(`${url}/api/v1/usuarios/inspector`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('¡La respuesta de la red no fue correcta!');
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          if (data !== undefined) {
            setInspector(data.data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [session]);

  return {
    inspector,
    loading,
  };
}
