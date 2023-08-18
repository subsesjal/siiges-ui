import { useEffect, useState } from 'react';

export default function getMunicipios() {
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/api/v1/municipios`, {
      headers: { api_key: apikey },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredMunicipios = data.data.filter(
          (municipio) => municipio.estadoId === 14,
        );
        setMunicipios(filteredMunicipios);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching municipios:', error);
        setLoading(false);
      });
  }, []);

  return {
    municipios,
    loading,
  };
}
