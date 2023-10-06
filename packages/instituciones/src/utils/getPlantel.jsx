import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@siiges-ui/shared';

export default function getPlantel() {
  const [plantel, setPlantel] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (router.isReady) {
      const { institucionId, plantelId } = router.query;
      fetch(
        `${url}/api/v1/instituciones/${institucionId}/planteles/${plantelId}`,
        { headers: { api_key: apikey, Authorization: `Bearer ${token}` } },
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setPlantel(data);
        });
      setLoading(false);
    }
  }, [router.isReady]);

  return {
    plantel,
    loading,
  };
}
