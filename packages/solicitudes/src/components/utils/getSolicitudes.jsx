import { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';

export default function getSolicitudes() {
  const [solicitudes, setSolicitudes] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);
  let solicitudData = {};

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/solicitudes/usuarios/${session.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        if (data !== undefined) {
          solicitudData = data.data;
        }
        setSolicitudes(solicitudData);
      });
    setLoading(false);
  }, []);

  return {
    solicitudes,
    loading,
  };
}
