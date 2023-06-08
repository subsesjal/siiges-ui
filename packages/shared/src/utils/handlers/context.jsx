/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [session, setSession] = useState({});
  const [auth, setAuth] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (session !== undefined) {
      setAuth(true);
    } else {
      router.push('/');
    }
  }, [session]);

  const value = {
    session,
    auth,
    activateAuth: (userData) => {
      setSession({
        id: userData.data.id,
        nombre: userData.data.usuario,
        rol: userData.data.rol.nombre,
        token: userData.token,
      });
      setAuth(true);
      router.push('../home');
    },
    removeAuth: () => {
      const nullSession = {};
      setSession(nullSession);
      setAuth(false);
      router.push('/');
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
