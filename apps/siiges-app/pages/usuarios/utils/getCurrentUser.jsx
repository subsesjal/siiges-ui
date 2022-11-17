import { useEffect, useState } from 'react';

export default function getCurrentUser(id) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/usuarios/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setUser(data);
      });
    setLoading(false);
  }, []);

  return {
    user,
    loading,
  };
}
