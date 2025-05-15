import { useEffect, useState } from 'react';
import { getToken } from '@siiges-ui/shared';

const ENDPOINT_MAPPING = {
  representante: (usuarioId) => `/api/v1/instituciones/usuarios/${usuarioId}`,
};

export default function getInstitucionUsuario(session, usuarioId) {
  const [institucion, setInstitucion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const basePath = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    async function fetchInstitucion() {
      if (!session || (!session.id && !usuarioId)) {
        setInstitucion(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { id, rol } = session;
        const targetId = rol === 'representante' ? id : usuarioId;

        if (!targetId) {
          throw new Error('No valid ID available for fetching institution data');
        }

        const endpoint = ENDPOINT_MAPPING.representante(targetId);
        const url = `${basePath}${endpoint}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            api_key: apikey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        setInstitucion(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch institution data');
        setInstitucion(null);
      } finally {
        setLoading(false);
      }
    }

    fetchInstitucion();
  }, [session, usuarioId, apikey, basePath, token]);

  return { institucion, loading, error };
}
