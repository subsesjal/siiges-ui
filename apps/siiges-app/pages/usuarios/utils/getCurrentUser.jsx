import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getCurrentUser() {
  const { session } = useContext(Context);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/usuarios/${session.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setUser(data);
      });
    setLoading(false);
  }, [session]);

  return {
    user,
    loading,
  };
}
