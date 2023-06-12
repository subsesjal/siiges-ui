import { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';

export default function getSolicitudes() {
  const { session } = useContext(Context);
  const [solicitudes, setSolicitudes] = useState();
  const [loading, setLoading] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  let url;
  let solicitudData = {};

  useEffect(() => {
    if (session !== undefined) {
      if (session.rol === 'representante') {
        url = `http://localhost:3000/api/v1/solicitudes/usuarios/${session.id}`;
      } else {
        url = 'http://localhost:3000/api/v1/solicitudes/';
      }
      fetch(url, {
        headers: {
          method: 'GET',
          api_key: apikey,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(true);
          if (data !== undefined) {
            solicitudData = data.data;
          }
          setSolicitudes(solicitudData);
        });
      setLoading(false);
    }
  }, [session]);

  return {
    solicitudes,
    loading,
  };
}
