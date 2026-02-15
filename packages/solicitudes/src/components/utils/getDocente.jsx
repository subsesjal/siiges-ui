import { useEffect, useState } from 'react';
import { useAuth, useUI, getToken } from '@siiges-ui/shared';

export default function useDocente(id) {
  const { session } = useAuth();
  const [docente, setDocente] = useState();

  useEffect(() => {
    let isMounted = true;
    if (session && id) {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      fetch(`${url}/api/v1/docentes/${id}`, {
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
        })

        .catch((err) => {
          if (isMounted) {
            console.error('¡Error al recuperar asignaturas!:', err);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id, session]);

  return docente;
}
