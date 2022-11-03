import { useEffect, useState } from 'react';

export default function getUsers() {
  const [users, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const active = 1;

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/usuarios')
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        const userData = data.data.map((entry) => {
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

        setUser(userData);
      });
    setLoading(false);
  }, []);

  return {
    users,
    loading,
  };
}
