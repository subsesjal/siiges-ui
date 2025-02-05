import React, {
  createContext, useEffect, useState, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getTokenLocalStorage from './getToken';
import SnackAlert from '../../components/Alert';
import { findRoute } from '../../components/Drawer/utils/menuUsers';

export const Context = createContext();

function Provider({ children }) {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [auth, setAuth] = useState(false);
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [section, setSection] = useState(findRoute(router.route, session.rol));

  const excludedRoutes = ['/revalidaciones', '/equivalencias'];

  const removeAuth = () => {
    router.push('/');
    localStorage.clear();
    setSession({});
    setAuth(false);
  };

  useEffect(() => {
    const storedData = getTokenLocalStorage();
    if (storedData) {
      setSession(storedData);
      setAuth(true);
    } else if (!excludedRoutes.includes(router.route)) {
      setShouldRedirect(true);
    }
    if (findRoute(router.route, session.rol)) {
      setSection(findRoute(router.route, session.rol));
    }
  }, [router]);

  useEffect(() => {
    if (shouldRedirect) {
      removeAuth();
    }
  }, [shouldRedirect]);

  const value = useMemo(
    () => ({
      session,
      auth,
      noti,
      setNoti,
      section,
      setSection,
      setLoading,
      loading,
      activateAuth: (userData) => {
        setSession({
          id: userData.data.id,
          nombre: userData.data.usuario,
          rol: userData.data.rol.nombre,
          token: userData.token,
        });
        localStorage.setItem('token', JSON.stringify(userData.token));
        setAuth(true);
        router.push('../home');
      },
      removeAuth,
    }),
    [session, auth, noti, router, section, loading],
  );

  return (
    <Context.Provider value={value}>
      {children}
      <SnackAlert
        open={noti.open}
        close={() => {
          setNoti(false);
        }}
        type={noti.type}
        mensaje={noti.message}
      />
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
