/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

export const Context = createContext();

const cookieObject = {};

function Provider({ children }) {
  const [cookies, removeCookie] = useCookies(['usuario']);
  cookieObject.usuario = cookies.nombre;
  cookieObject.rol = cookies.rol;
  const [session, setSession] = useState(() => cookies);
  const [auth, setAuth] = useState(false);

  const value = {
    session,
    auth,
    cookies,
    revalidateSession: () => {
      cookieObject.usuario = cookies.nombre;
      cookieObject.rol = cookies.rol;
      setSession(cookieObject);
    },
    activateAuth: () => {
      const newObject = { ...session };
      newObject.usuario = cookies.nombre;
      newObject.rol = cookies.rol;
      setSession(newObject);
      setAuth(true);
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
