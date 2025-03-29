import React, {
  createContext, useEffect, useState, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getTokenLocalStorage from './getToken';
import SnackAlert from '../../components/Alert';
import { findRoute } from '../../components/Drawer/utils/menuUsers';

export const Context = createContext();

const getAvatarStorageKey = (userId) => `user_${userId}_avatar`;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

function Provider({ children }) {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [auth, setAuth] = useState(false);
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [section, setSection] = useState(findRoute(router.route, session.rol));
  const [avatarUrl, setAvatarUrl] = useState(null);

  const excludedRoutes = ['/revalidaciones', '/equivalencias'];

  const fetchAvatar = async (userId) => {
    if (!session?.token) {
      localStorage.setItem(getAvatarStorageKey(userId), 'no-image');
      return null;
    }

    const storageKey = getAvatarStorageKey(userId);

    try {
      const endpoint = `${domain}/api/v1/files/`;
      const query = `?tipoEntidad=PERSONA&entidadId=${userId}&tipoDocumento=FOTOGRAFIA_PERSONA`;
      const fullUrl = `${endpoint}${query}`;

      const response = await fetch(fullUrl, {
        headers: {
          api_key: apiKey,
          Authorization: `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Image fetched');

      if (data.data?.ubicacion) {
        const url = `${domain}${data.data.ubicacion}`;
        const imageResponse = await fetch(url);
        const blob = await imageResponse.blob();

        // Convert blob to base64
        const base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        localStorage.setItem(storageKey, base64Data);
        return base64Data;
      }

      localStorage.setItem(storageKey, 'no-image');
      return null;
    } catch (error) {
      localStorage.setItem(storageKey, 'no-image');
      return null;
    }
  };

  const getAvatar = async (userId) => {
    if (!userId || !session?.token) return null;

    const storageKey = getAvatarStorageKey(userId);
    const cachedAvatar = localStorage.getItem(storageKey);

    if (cachedAvatar && cachedAvatar !== 'no-image') {
      return cachedAvatar;
    }

    return fetchAvatar(userId);
  };

  const removeAuth = () => {
    router.push('/');
    localStorage.clear();
    setSession({});
    setAuth(false);
    setAvatarUrl(null);
  };

  useEffect(() => {
    const storedData = getTokenLocalStorage();
    if (storedData) {
      setSession(storedData);
      setAuth(true);
      getAvatar(storedData.id).then((url) => {
        if (url) setAvatarUrl(url);
      });
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
      avatarUrl,
      refreshAvatar: () => session.id && fetchAvatar(session.id),
      activateAuth: (userData) => {
        const newSession = {
          id: userData.data.id,
          nombre: userData.data.usuario,
          rol: userData.data.rol.nombre,
          token: userData.token,
        };
        setSession(newSession);
        localStorage.setItem('token', JSON.stringify(userData.token));
        setAuth(true);
        getAvatar(userData.data.id).then((url) => {
          if (url) setAvatarUrl(url);
        });
        router.push('../home');
      },
      removeAuth,
    }),
    [session, auth, noti, router, section, loading, avatarUrl],
  );

  useEffect(() => () => {
    if (avatarUrl && avatarUrl.startsWith('blob:')) {
      URL.revokeObjectURL(avatarUrl);
    }
  }, [avatarUrl]);

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
