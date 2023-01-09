import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function getPlantel() {
  const [plantel, setPlantel] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { institucionId, plantelId } = router.query;
      fetch(`http://localhost:3000/api/v1/instituciones/${institucionId}/planteles/${plantelId}`)
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
