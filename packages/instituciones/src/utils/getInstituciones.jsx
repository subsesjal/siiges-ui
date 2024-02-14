import { getToken } from '@siiges-ui/shared';
import { useEffect, useState } from 'react';

export default function getInstituciones(esAutorizado) {
  const [instituciones, setInstituciones] = useState();
  const [loading, setLoading] = useState(true);
  let userData = {};
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const finalURL = esAutorizado
      ? `${url}/api/v1/instituciones?esNombreAutorizado=true`
      : `${url}/api/v1/instituciones`;

    fetch(finalURL, {
      headers: { api_key: apikey, Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.data !== undefined) {
          userData = data.data;
        }
        setInstituciones(userData);
      });

    setLoading(true);
  }, [esAutorizado]);

  return {
    instituciones,
    loading,
  };
}
