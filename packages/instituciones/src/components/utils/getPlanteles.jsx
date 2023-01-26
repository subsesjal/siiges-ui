import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function getPlanteles() {
  const [planteles, setPlanteles] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { institucionId } = router.query;
      fetch(
        `http://localhost:3000/api/v1/instituciones/${institucionId}/planteles`,
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
