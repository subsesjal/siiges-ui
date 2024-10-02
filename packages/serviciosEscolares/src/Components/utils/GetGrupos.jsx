import { useState, useEffect } from 'react';
import { getToken } from '@siiges-ui/shared';

export default function useGrupos(ciclosEscolarId, gradoId) {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ciclosEscolarId && gradoId) {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      setLoading(true);

      fetch(
        `${url}/api/v1/grupos/ciclosEscolares/${ciclosEscolarId}/grados/${gradoId}`,
        {
          headers: { api_key: apikey, Authorization: `Bearer ${token}` },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data !== undefined) {
            setGrupos(data.data);
          } else {
            setGrupos([]);
          }
        })
        .catch((error) => {
          console.error('¡Error al recuperar grupos!:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [ciclosEscolarId, gradoId]);

  return { grupos, loading };
}
