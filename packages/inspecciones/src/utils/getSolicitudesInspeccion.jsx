import { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';

export default function getSolicitudesInspecciones() {
  const { session } = useContext(Context);
  const [solicitudesInspecciones, setSolicitudesInspecciones] = useState();
  const [loading, setLoading] = useState(true);
  let solicitudData = {};
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session !== undefined) {
      fetch(`${url}/api/v1/solicitudes/?estatus=6`, {
        headers: {
          method: 'GET',
          api_key: apikey,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data !== undefined) {
            solicitudData = data.data;
          }
          setSolicitudesInspecciones(solicitudData);
        });
      setLoading(false);
    }
  }, [session]);

  return {
    solicitudesInspecciones,
    loading,
  };
}
