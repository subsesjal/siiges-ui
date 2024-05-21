import { Context, getToken } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getPlantelesUsuario() {
  const [planteles, setPlanteles] = useState();
  const [loading, setLoading] = useState(false);
  const { session, setNoti } = useContext(Context);
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/api/v1/planteles/usuarios/${session.id}`, {
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPlanteles(response.data);
      })
      .catch((err) => {
        setNoti({
          open: true,
          message: `Error al actualizar la solicitud: ${err}`,
          type: 'success',
        });
        setPlanteles(null); // puedes establecer planteles a null o manejar el error de otra manera
      })
      .finally(() => {
        setLoading(false);
      });
  }, [session]);

  return {
    planteles,
    loading,
  };
}
