import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';

export default function getUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);
  const token = getToken();
  const active = 1;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const buildApiUrl = () => {
    if (session.rol === 'admin') {
      return `${url}/api/v1/usuarios`;
    }
    if (session.rol === 'representante') {
      return `${url}/api/v1/usuarios/${session.id}/usuarios`;
    }
    return '';
  };

  const mapUserData = ({ data }) => {
    if (data !== undefined && data.length > 0) {
      return data.data.map((entry) => ({
        ...entry,
        estatus: entry.estatus === active ? 'Activo' : 'Inactivo',
        rol: entry.rol.descripcion,
      }));
    }
    return [];
  };

  const fetchData = async () => {
    setLoading(true);
    const apiUrl = buildApiUrl();

    try {
      const response = await fetch(apiUrl, {
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const updatedUsers = mapUserData(data);

      setUsers(updatedUsers);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session, token, url, active]);

  return {
    users,
    loading,
  };
}
