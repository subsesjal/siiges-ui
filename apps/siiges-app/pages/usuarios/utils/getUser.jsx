import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function getUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      fetch(`http://localhost:3000/api/v1/usuarios/${id}`, { headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' } })
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setUser(data);
        });
      setLoading(false);
    }
  }, [router.isReady]);

  return {
    user,
    loading,
  };
}
