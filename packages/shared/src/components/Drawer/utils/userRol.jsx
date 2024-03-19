import { optionsMenuFilter, optionsAdminMenuFilter } from './menuUsers';

export default function userRol(session, setUsers, section) {
  if (session.rol === 'admin') {
    setUsers(optionsAdminMenuFilter[section - 1]);
  }
  if (session.rol !== 'admin') {
    setUsers(optionsMenuFilter[session.rol] || []);
  }
}
