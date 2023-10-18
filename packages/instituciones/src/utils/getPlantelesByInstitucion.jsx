import { useEffect, useState } from 'react';

export default function getPlantelesByInstitucion(institucionId) {
  const [planteles, setPlanteles] = useState();
  const [loading, setLoading] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    fetch(`${url}/api/v1/instituciones/${institucionId}/planteles`, {
      headers: { api_key: apikey },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setPlanteles(data);
      });
    setLoading(false);
  }, [institucionId]);

  return {
    planteles,
    loading,
  };
}
