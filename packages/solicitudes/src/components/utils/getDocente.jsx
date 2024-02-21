import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function useDocente(id) {
  const { session } = useContext(Context);
  const [docente, setDocente] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (session && id) {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      fetch(`${url}/api/v1/docentes/docente/${id}`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (isMounted && data && data.data) {
            setDocente(data.data);
          }
          setLoading(false);
        })

        .catch((err) => {
          if (isMounted) {
            console.error('Error fetching asignaturas:', err);
            setError(err);
            setLoading(false);
          }
        });
    } else if (isMounted) {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [id, session]);

  return {
    docente,
    loading,
    error,
  };
}
