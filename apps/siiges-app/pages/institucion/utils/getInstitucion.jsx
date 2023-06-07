import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function getInstitucion() {
  const [institucion, setInstitucion] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { institucionId } = router.query;
      fetch(`http://localhost:3000/api/v1/instituciones/${institucionId}/planteles`, {
        headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setInstitucion(data);
        });
      setLoading(false);
    }
  }, [router.isReady]);

  return {
    institucion,
    loading,
  };
}
