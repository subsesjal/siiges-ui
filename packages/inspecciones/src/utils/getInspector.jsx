import { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';

export default function getInspector() {
  const { session } = useContext(Context);
  const [inspector, setInspector] = useState({});
  const [loading, setLoading] = useState(true);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session !== undefined) {
      fetch(`${url}/api/v1/usuarios/inspector`, {
        method: 'GET',
        headers: {
          api_key: apikey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          if (data !== undefined) {
            setInspector(data.data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [session]);

  return {
    inspector,
    loading,
  };
}
