import { optionsMenuFilter, optionsAdminMenuFilterRol } from './menuUsers';

export default function userRol(session, setUsers, section) {
  if (session.rol === 'admin' || session.rol === 'representante') {
    setUsers(optionsAdminMenuFilterRol(session.rol)[section - 1]);
  } else {
    setUsers(optionsMenuFilter[session.rol] || []);
  }
}
