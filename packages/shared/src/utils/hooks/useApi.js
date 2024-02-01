import router from 'next/router';
import { useState, useEffect } from 'react';
import { getToken, cleanData } from '@siiges-ui/shared';

const errorMessages = {
  404: 'Not Found',
  401: 'Unauthorized',
  409: 'Conflict',
};

const useApi = ({
  endpoint, method = 'GET', dataBody = null, reload, setNoti, schema,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const request = schema ? cleanData(dataBody, schema) : dataBody;

  useEffect(() => {
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
          body: method !== 'GET' && request ? JSON.stringify(request) : null,
          redirect: 'follow',
        });

        if (!response.ok) {
          if (setNoti) {
            const errorMessage = errorMessages[response.status] || `Response status: ${response.status}`;

            setNoti({
              open: true,
              message: errorMessage,
              type: 'error',
            });
          }
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.data) {
          setData(result.data);
        } else {
          setData(result);
        }

        if (setNoti) {
          setNoti({
            open: true,
            message: 'Registro exitoso',
            type: 'success',
          });

          setTimeout(() => {
            router.back();
          }, 3000);
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
