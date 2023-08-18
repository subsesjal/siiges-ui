import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function getPlanteles() {
  const [planteles, setPlanteles] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (router.isReady) {
      const { institucionId } = router.query;
      fetch(
        `${url}/api/v1/instituciones/${institucionId}/planteles`,
        { headers: { api_key: apikey } },
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setPlanteles(data);
        });
      setLoading(false);
    }
  }, [router.isReady]);

  return {
    planteles,
    loading,
  };
}
