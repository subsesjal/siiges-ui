import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function useAsignaturas(programaId) {
  const { session } = useContext(Context);
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && programaId) {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      fetch(`${url}/api/v1/asignaturas/programas/${programaId}`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            setAsignaturas(data.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [programaId, session]);

  return {
    asignaturas,
    loading,
  };
}
