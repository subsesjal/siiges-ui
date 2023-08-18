import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getCurrentUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    fetch(`${url}/api/v1/usuarios/${session.id}/detalle`, {
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${session.token}`,
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
