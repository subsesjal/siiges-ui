import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const UserContext = createContext(undefined);

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

// Cache en memoria con límite LRU simple
class AvatarCache {
  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(userId) {
    if (!this.cache.has(userId)) return null;
    
    // Mover al final (LRU)
    const value = this.cache.get(userId);
    this.cache.delete(userId);
    this.cache.set(userId, value);
    return value;
  }

  set(userId, value) {
    // Si existe, actualizar
    if (this.cache.has(userId)) {
      this.cache.delete(userId);
    }

    // Si está lleno, eliminar el más antiguo
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      const firstValue = this.cache.get(firstKey);
      
      // Liberar blob URL si existe
      if (firstValue && typeof firstValue === 'string' && firstValue.startsWith('blob:')) {
        URL.revokeObjectURL(firstValue);
      }
      
      this.cache.delete(firstKey);
    }

    this.cache.set(userId, value);
  }

  has(userId) {
    return this.cache.has(userId);
  }

  clear() {
    // Liberar todos los blob URLs
    this.cache.forEach((value) => {
      if (typeof value === 'string' && value.startsWith('blob:')) {
        URL.revokeObjectURL(value);
      }
    });
    this.cache.clear();
  }
}

// Instancia global del cache
const avatarCache = new AvatarCache();

/**
 * Hook para acceder al contexto de usuario
 * @throws {Error} Si se usa fuera del UserProvider
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

/**
 * Provider de usuario
 * Maneja datos del perfil, avatar y cache
 */
export function UserProvider({ children }) {
  const { session, auth } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  /**
   * Obtiene el avatar del servidor
   */
  const fetchAvatar = useCallback(
    async (userId) => {
      if (!session?.token || !userId) {
        return null;
      }

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
          return null;
        }

        const data = await response.json();

        if (data.data?.ubicacion) {
          const url = `${domain}${data.data.ubicacion}`;
          const imageResponse = await fetch(url);
          const blob = await imageResponse.blob();
          
          // Crear blob URL en lugar de base64
          const blobUrl = URL.createObjectURL(blob);
          
          return blobUrl;
        }

        return null;
      } catch (error) {
        console.error('Error fetching avatar:', error);
        return null;
      }
    },
    [session?.token],
  );

  /**
   * Obtiene el avatar (desde cache o servidor)
   */
  const getAvatar = useCallback(
    async (userId) => {
      if (!userId || !session?.token) {
        return null;
      }

      // Revisar cache primero
      if (avatarCache.has(userId)) {
        return avatarCache.get(userId);
      }

      // Fetch desde servidor
      setIsLoadingAvatar(true);
      try {
        const url = await fetchAvatar(userId);
        if (url) {
          avatarCache.set(userId, url);
        }
        return url;
      } finally {
        setIsLoadingAvatar(false);
      }
    },
    [session?.token, fetchAvatar],
  );

  /**
   * Refresca el avatar del usuario actual
   */
  const refreshAvatar = useCallback(async () => {
    if (!session?.id) return;

    setIsLoadingAvatar(true);
    try {
      const url = await fetchAvatar(session.id);
      if (url) {
        avatarCache.set(session.id, url);
        setAvatarUrl(url);
      }
    } finally {
      setIsLoadingAvatar(false);
    }
  }, [session?.id, fetchAvatar]);

  /**
   * Limpia el cache de avatares
   */
  const clearAvatarCache = useCallback(() => {
    avatarCache.clear();
    setAvatarUrl(null);
  }, []);

  // Cargar avatar cuando cambia la sesión
  useEffect(() => {
    if (auth && session?.id) {
      getAvatar(session.id).then((url) => {
        if (url) {
          setAvatarUrl(url);
        }
      });
    } else {
      setAvatarUrl(null);
    }
  }, [auth, session?.id, getAvatar]);

  // Limpiar blob URL al desmontar
  useEffect(
    () => () => {
      if (avatarUrl && avatarUrl.startsWith('blob:')) {
        URL.revokeObjectURL(avatarUrl);
      }
    },
    [avatarUrl],
  );

  const value = useMemo(
    () => ({
      avatarUrl,
      isLoadingAvatar,
      refreshAvatar,
      getAvatar,
      clearAvatarCache,
    }),
    [avatarUrl, isLoadingAvatar, refreshAvatar, getAvatar, clearAvatarCache],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
