import { getToken } from '@siiges-ui/shared';
import { useEffect, useState } from 'react';

const ENDPOINT_MAPPING = {
  representante: (usuarioId) => `/api/v1/instituciones/usuarios/${usuarioId}`,
};

export default function getInstitucionUsuario({ session }) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const basePath = process.env.NEXT_PUBLIC_URL;
  const [institucion, setInstitucion] = useState();

  useEffect(() => {
    const { id, rol } = session;

    if (session.rol === 'representante') {
      const endpoint = ENDPOINT_MAPPING[rol](id);
      const url = `${basePath}${endpoint}`;
      fetch(url, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(({ data }) => {
          setInstitucion(data);
        });
    }
  }, [session]);

  return {
    institucion,
  };
}
