import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getInstitucionUsuario() {
  const [institucion, setInstitucion] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/instituciones/usuarios/${session.id}`, { headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' } })
      .then((response) => response.json())
      .then((response) => {
        setLoading(true);
        setInstitucion(response.data);
      });
    setLoading(false);
  }, [session]);

  return {
    institucion,
    loading,
  };
}
