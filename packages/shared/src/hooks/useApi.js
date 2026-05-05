import { useState, useEffect } from 'react';
import { getToken } from '@siiges-ui/shared';

const useApi = ({
  endpoint, method = 'GET', dataBody = null, reload,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    setData(null);
    setError(null);
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/${endpoint}`, {
          method,
          headers: {
            api_key: apikey,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: method !== 'GET' && dataBody ? JSON.stringify(dataBody) : null,
          redirect: 'follow',
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }

        const result = await response.json();
        if (result.data) {
          setData(result.data);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, apikey, url, token, reload]); // Agrega 'reload' como una dependencia

  return { data, loading, error };
};

export default useApi;
