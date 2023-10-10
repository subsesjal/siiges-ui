import { getToken } from '@siiges-ui/shared';
import { useEffect, useState } from 'react';

export default function getInstituciones() {
  const [instituciones, setInstituciones] = useState();
  const [loading, setLoading] = useState(false);
  let userData = {};
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    fetch(`${url}/api/v1/instituciones`, {
      headers: { api_key: apikey, Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        if (data.data !== undefined) {
          userData = data.data;
        }
        setInstituciones(userData);
      });
    setLoading(false);
  }, []);

  return {
    instituciones,
    loading,
  };
}
