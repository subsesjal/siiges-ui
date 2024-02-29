import { getToken } from '@siiges-ui/shared';
import { useEffect, useState } from 'react';

export default function getInstituciones({ esNombreAutorizado, tipoInstitucionId, setLoading }) {
  const [instituciones, setInstituciones] = useState();
  let userData = {};
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const finalURL = `${url}/api/v1/instituciones${esNombreAutorizado
      ? '?esNombreAutorizado=true'
      : ''}${tipoInstitucionId
      ? `${esNombreAutorizado
        ? '&'
        : '?'}tipoInstitucionId=${tipoInstitucionId}`
      : ''}`;

    fetch(finalURL, {
      headers: { api_key: apikey, Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data !== undefined) {
          userData = data.data;
        }
        setInstituciones(userData);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, [esNombreAutorizado]);

  return {
    instituciones,
  };
}
