import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getPlantelesUsuario() {
  const [planteles, setPlanteles] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/planteles/usuarios/${session.id}`, {
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${session.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(true);
        setPlanteles(response.data);
      })
      .catch((err) => {
        console.error('Request failed', err);
      });
    setLoading(false);
  }, [session]);

  return {
    planteles,
    loading,
  };
}
