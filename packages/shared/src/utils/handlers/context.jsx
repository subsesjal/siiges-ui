/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [cookies, removeCookie] = useCookies(['usuario']);
  const [session, setSession] = useState({});
  const [auth, setAuth] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cookies.rol !== null) {
      setSession({ nombre: cookies.nombre, rol: cookies.rol });
      setAuth(true);
    } else {
      router.push('./');
    }
  }, [cookies]);

  const value = {
    session,
    auth,
    cookies,
    activateAuth: (userData) => {
      setSession({ nombre: userData.usuario, rol: userData.rolId });
      setAuth(true);
      router.push('../home');
    },
    removeAuth: () => {
      const nullSession = {};
      setSession(nullSession);
      removeCookie('nombre');
      removeCookie('rol');
      setAuth(false);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
