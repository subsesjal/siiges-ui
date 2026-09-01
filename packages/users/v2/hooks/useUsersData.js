import { useEffect, useState } from 'react';
import { getUsers } from '../services/usuarios.service';

const useUsersData = ({
  session,
  refreshKey,
  page = 0,
  limit = 10,
  search = '',
  sortBy = 'id',
  sortOrder = 'asc',
}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page,
    limit,
    total: 0,
    totalPages: 0,
    sortBy,
    sortOrder,
    search,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session?.rol) return () => {};

    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    getUsers({
      session,
      signal: controller.signal,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    })
      .then((result) => {
        if (!active) return;
        if (Array.isArray(result)) {
          setData(result);
          setPagination((current) => ({
            ...current,
            page,
            limit,
            total: result.length,
            totalPages: result.length ? Math.ceil(result.length / limit) : 0,
            sortBy,
            sortOrder,
            search,
          }));
          return;
        }

        setData(Array.isArray(result?.data) ? result.data : []);
        setPagination(
          result?.pagination || {
            page,
            limit,
            total: 0,
            totalPages: 0,
            sortBy,
            sortOrder,
            search,
          },
        );
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
  }, [
    session?.rol,
    session?.id,
    session?.token,
    refreshKey,
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  ]);

  return {
    data,
    loading,
    error,
    pagination,
  };
};

export default useUsersData;
