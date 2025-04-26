import { Context, getToken } from '@siiges-ui/shared';
import {
  useContext, useEffect, useState, useCallback,
} from 'react';

export default function usePlantelesUsuario(usuarioId) {
  const [planteles, setPlanteles] = useState(null);
  const [error, setError] = useState(null);
  const { session, setNoti, setLoading } = useContext(Context);
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const fetchPlanteles = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/v1/planteles/usuarios/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.json();
      setPlanteles(data);
    } catch (err) {
      console.error('Error fetching planteles:', err);
      setError(err.message);
      setNoti({
        open: true,
        message: `¡Error al obtener los planteles!: ${err.message}`,
        type: 'error',
      });
      setPlanteles(null);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, apikey, token, setNoti]);

  useEffect(() => {
    if (!session) return;

    const idToFetch = session.rol === 'representante' ? session.id : usuarioId;

    if (!idToFetch) {
      setError('No user ID available for fetching planteles');
      return;
    }

    fetchPlanteles(idToFetch);
  }, [session, usuarioId]);

  return {
    planteles,
    error,
    refetch: fetchPlanteles,
  };
}
