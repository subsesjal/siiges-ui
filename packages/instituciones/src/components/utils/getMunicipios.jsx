import { useEffect, useState } from 'react';

export default function getMunicipios() {
  const [municipios, setMunicipios] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/municipios', { headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' } })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setMunicipios(data);
      });
    setLoading(false);
  }, []);

  return {
    municipios,
    loading,
  };
}
