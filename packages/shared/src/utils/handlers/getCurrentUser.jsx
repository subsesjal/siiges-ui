import { getToken, useAuth } from '@siiges-ui/shared';
import { useEffect, useState } from 'react';

export default function getCurrentUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    fetch(`${url}/api/v1/usuarios/${session.id}/detalle`, {
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setUser(data.data);
      });
    setLoading(false);
  }, [session]);

  return {
    user,
    loading,
  };
}
