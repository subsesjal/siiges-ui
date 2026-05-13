import { useEffect, useState } from 'react';
import { getUsers } from '../services/usuarios.service';

const useUsersData = ({ session, refreshKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session?.rol) return () => {};

    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    getUsers({ session, signal: controller.signal })
      .then((result) => {
        if (!active) return;
        setData(Array.isArray(result) ? result : []);
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
  }, [session?.rol, session?.id, session?.token, refreshKey]);

  return { data, loading, error };
};

export default useUsersData;
