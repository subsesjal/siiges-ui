import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getCurrentUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);

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
