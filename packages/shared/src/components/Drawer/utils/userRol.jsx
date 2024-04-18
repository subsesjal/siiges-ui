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
  const usersFindIndex = (usersData, findData) => usersData.flat()
    .filter(({ userId }) => userId === findData);
  useEffect(() => {
    const findIndex = findRoute(router.route, session.rol);
    if (userMultiRol.includes(session.rol)) {
      const users = optionsAdminMenuFilterRol(session.rol);
      const validateNumberUsers = users.flat().reduce((acc, user) => {
        if (!acc.includes(user.userId)) {
          acc.push(user.userId);
        }
        return acc;
      }, []);
      if (!validateNumberUsers.includes(section)) {
        setUsers(usersFindIndex(users, findIndex));
      } else setUsers(usersFindIndex(users, section));
    } else {
      setUsers(optionsMenuFilter[session.rol] || []);
    }
  }, [session, section]);
}
