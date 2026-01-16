import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { optionsMenuFilter, optionsAdminMenuFilterRol, findRoute } from './menuUsers';

const userMultiRol = [
  'admin',
  'representante',
  'sicyt_editar',
  'ce_ies',
  'ce_sicyt',
];

export default function useUserRol(session, setUsers, section) {
  const router = useRouter();

  // eslint-disable-next-line max-len
  const usersFindIndex = (usersData, findData) => usersData.flat().filter(({ userId }) => userId === findData);

  useEffect(() => {
    if (!session) return;

    const { rol, nombre } = session;

    const findIndex = findRoute(router.route, rol, nombre);

    if (userMultiRol.includes(rol)) {
      const users = optionsAdminMenuFilterRol(rol, nombre);

      const validateNumberUsers = users.flat().reduce((acc, user) => {
        if (user && !acc.includes(user.userId)) {
          acc.push(user.userId);
        }
        return acc;
      }, []);

      if (!validateNumberUsers.includes(section)) {
        setUsers(usersFindIndex(users, findIndex));
      } else {
        setUsers(usersFindIndex(users, section));
      }
    } else {
      setUsers(optionsMenuFilter[rol] || []);
    }
  }, [session, section]);
}
