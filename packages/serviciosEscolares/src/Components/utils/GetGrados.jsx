import { getToken } from '@siiges-ui/shared';
import { useEffect, useState } from 'react';

export default function getGrados(id) {
  const [grados, setGrados] = useState([]);
  const [loading, setLoading] = useState(false);
  let userData = {};
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    fetch(`${url}/api/v1/grados/programas/${id}`, {
      headers: { api_key: apikey, Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        if (data.data !== undefined) {
          userData = data.data;
        }
        setGrados(userData);
      });
    setLoading(false);
  }, []);

  return {
    grados,
    loading,
  };
}
