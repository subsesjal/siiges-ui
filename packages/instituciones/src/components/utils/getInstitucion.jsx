import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@siiges-ui/shared';

export default function getInstitucion() {
  const [institucion, setInstitucion] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (router.isReady) {
      const { institucionId } = router.query;
      fetch(`${url}/api/v1/instituciones/${institucionId}/planteles`, {
        headers: { api_key: apikey, Authorization: `Bearer ${token}` },
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
