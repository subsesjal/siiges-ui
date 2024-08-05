import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function usePrograma(programaId) {
  const { session } = useContext(Context);
  const [programaData, setProgramaData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (session && programaId) {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      fetch(`${url}/api/v1/programas/${programaId}`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (isMounted && data && data.data) {
            setProgramaData(data.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          if (isMounted) {
            console.error('Error fetching programa data:', err);
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
  }, [programaId, session]);

  return {
    programaData,
    loading,
    error,
    rol: session?.rol,
  };
}
