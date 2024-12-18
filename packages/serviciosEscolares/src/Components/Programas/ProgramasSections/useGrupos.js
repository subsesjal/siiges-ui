import { useState, useEffect } from 'react';
import { getToken } from '@siiges-ui/shared';

export default function useGrupos(ciclosEscolarId, gradoId, fetchGrupos, setFetchGrupos) {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchGroupData = async () => {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      if (!apikey || !url) {
        console.error('¡Clave API o URL no definida en las variables de entorno!');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `${url}/api/v1/grupos/ciclosEscolares/${ciclosEscolarId}/grados/${gradoId}`,
          {
            headers: { api_key: apikey, Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();

        if (isMounted) {
          if (data.data !== undefined) {
            setGrupos(data.data);
          } else {
            setGrupos([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('¡Error al recuperar grupos!:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setFetchGrupos(false);
        }
      }
    };

    if (ciclosEscolarId && gradoId && fetchGrupos) {
      fetchGroupData();
    }

    return () => {
      isMounted = false;
    };
  }, [ciclosEscolarId, gradoId, fetchGrupos, setFetchGrupos]);

  return { grupos, loading };
}
