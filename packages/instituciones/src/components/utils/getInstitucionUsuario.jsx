import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getInstitucionUsuario() {
  const [institucion, setInstitucion] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchInstitucion = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${url}/api/v1/instituciones/usuarios/${session.id}`,
          {
            headers: {
              api_key: apikey,
              Authorization: `Bearer ${session.token}`,
            },
          },
        );
        const data = await response.json();
        setInstitucion(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching institucion:', error);
        setLoading(false);
      }
    };

    fetchInstitucion();
  }, [session.id]);

  return {
    institucion,
    loading,
  };
}
