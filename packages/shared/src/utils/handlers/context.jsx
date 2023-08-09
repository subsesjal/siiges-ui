/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getTokenLocalStorage from './getToken';
import SnackAlert from '../../components/Alert';

export const Context = createContext();

function Provider({ children }) {
  const [session, setSession] = useState({});
  const [auth, setAuth] = useState(false);
  const [noti, setNoti] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedData = getTokenLocalStorage();
    if (storedData) {
      setSession(storedData);
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    const storedData = getTokenLocalStorage();
    if (storedData) {
      setAuth(true);
    } else {
      router.push('/');
    }
  }, [session]);

  const value = {
    session,
    auth,
    noti,
    setNoti,
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
    removeAuth: () => {
      const nullSession = {};
      setSession(nullSession);
      setAuth(false);
      router.push('/');
    },
  };
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
