import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function getInspectoresProgramas() {
  const { session, setLoading } = useContext(Context);
  const token = getToken();
  const [inspectoresProgramas, setInspectoresProgramas] = useState();
  let solicitudData = {};
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session !== undefined) {
      setLoading(true);
      fetch(`${url}/api/v1/inspecciones/inspectores-programas`, {
        headers: {
          method: 'GET',
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data !== undefined) {
            solicitudData = data.data;
          }
          setInspectoresProgramas(solicitudData);
        });
      setLoading(false);
    }
  }, [session]);

  return {
    inspectoresProgramas,
  };
}
