import { Context } from '@siiges-ui/shared';
import { useContext, useEffect, useState } from 'react';

export default function getUsers() {
  const [users, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { session } = useContext(Context);
  const active = 1;
  let userData = {};
  let url;

  if (session.rol === 'admin') {
    url = 'http://localhost:3000/api/v1/usuarios';
  } else {
    url = `http://localhost:3000/api/v1/usuarios/${session.id}/usuarios`;
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        if (data.data !== undefined) {
          userData = data.data.map((entry) => {
            const rol = entry.rol.descripcion;
            if (entry.estatus === active) {
              return {
                ...entry,
                estatus: 'Activo',
                rol,
              };
            }
            return {
              ...entry,
              estatus: 'Inactivo',
              rol,
            };
          });
        }
        setUser(userData);
      });
    setLoading(false);
  }, []);

  return {
    users,
    loading,
  };
}
