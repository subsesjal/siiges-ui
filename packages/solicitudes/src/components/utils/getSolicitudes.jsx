import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function getSolicitudes() {
  const { session } = useContext(Context);
  const token = getToken();
  const [solicitudes, setSolicitudes] = useState();
  const [loading, setLoading] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  let varUrl;
  let solicitudData = {};

  useEffect(() => {
    if (session.rol !== undefined) {
      if (session.rol === 'admin' || session.rol === 'sicyt_editar' || session.rol === 'control_documental') {
        varUrl = `${url}/api/v1/solicitudes/`;
      } else {
        varUrl = `${url}/api/v1/solicitudes/usuarios/${session.id}`;
      }
      fetch(varUrl, {
        headers: {
          method: 'GET',
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
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
