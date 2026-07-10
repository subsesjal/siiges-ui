import { useEffect, useState } from 'react';
import {
  getUserById,
} from '../services/usuarios.service';

const useUserDetail = ({
  session,
  usuarioId,
  enabled,
  initialData,
}) => {
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !usuarioId || !session?.token) {
      setData(initialData || null);
      return () => {};
    }

    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);
    if (initialData && initialData.id === usuarioId) {
      setData(initialData);
    }

    getUserById({ session, usuarioId, signal: controller.signal })
      .then((result) => {
        if (!active) return;
        setData(result);
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return;
        setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [session, usuarioId, enabled, initialData]);

  return { data, loading, error };
};

export default useUserDetail;
