import { useEffect, useState } from 'react';
import { getToken } from '@siiges-ui/shared';

const ENDPOINT_MAPPING = {
  representante: (usuarioId) => `/api/v1/instituciones/usuarios/${usuarioId}`,
};

export default function useInstitucionUsuario(session) {
  const [institucion, setInstitucion] = useState(null);
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const basePath = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    async function fetchInstitucion() {
      const { id, rol } = session;

      if (rol === 'representante') {
        const endpoint = ENDPOINT_MAPPING[rol](id);
        const url = `${basePath}${endpoint}`;

        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              api_key: apikey,
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`¡Error en el estatus HTTP!: ${response.status}`);
          }

          const data = await response.json();
          setInstitucion(data.data);
        } catch (error) {
          console.error('¡Error al recuperar los datos de la institución!:', error);
        }
      }
    }

    if (session) {
      fetchInstitucion();
    }
  }, [session, apikey, basePath, token]);

  return institucion;
}
