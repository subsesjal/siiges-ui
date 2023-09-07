import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getInstituciones() {
  const [instituciones, setInstituciones] = useState();
  const [loading, setLoading] = useState(false);
  let userData = {};
  const { session } = useContext(Context);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    fetch(`${url}/api/v1/instituciones`, {
      headers: { api_key: apikey, Authorization: `Bearer ${session.token}` },
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
