import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getTokenLocalStorage from '../utils/handlers/getToken';

const AuthContext = createContext(undefined);

/**
 * Hook para acceder al contexto de autenticación
 * @throws {Error} Si se usa fuera del AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

/**
 * Provider de autenticación
 * Maneja sesión, login, logout y redirecciones
 */
export function AuthProvider({ children }) {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [auth, setAuth] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Rutas que no requieren autenticación
  const excludedRoutes = useMemo(
    () => [
      '/revalidaciones',
      '/equivalencias',
      '/autenticacion/recovery-password/[token]',
      '/tituloElectronico',
      '/tituloElectronico/[folio]/consultarFolio',
      '/consultaRevEquiv',
      '/consultaRevEquiv/[folio]/consultarFolio',
    ],
    [],
  );

  /**
   * Activa la sesión del usuario después del login
   */
  const activateAuth = useCallback(
    (userData) => {
      const newSession = {
        id: userData.data.id,
        nombre: userData.data.usuario,
        rol: userData.data.rol.nombre,
        token: userData.token,
      };
      setSession(newSession);
      localStorage.setItem('token', JSON.stringify(userData.token));
      setAuth(true);
      router.push('/home');
    },
    [router],
  );

  /**
   * Cierra sesión y limpia todos los datos
   */
  const removeAuth = useCallback(() => {
    router.push('/');
    localStorage.clear();
    setSession({});
    setAuth(false);
  }, [router]);

  // Efecto: Verificar token al montar y en cambios de ruta
  useEffect(() => {
    const storedData = getTokenLocalStorage();
    if (storedData) {
      setSession(storedData);
      setAuth(true);
    } else if (!excludedRoutes.includes(router.route)) {
      setShouldRedirect(true);
    }
  }, [router.route, excludedRoutes]);

  // Efecto: Ejecutar redirección si es necesaria
  useEffect(() => {
    if (shouldRedirect) {
      removeAuth();
      setShouldRedirect(false);
    }
  }, [shouldRedirect, removeAuth]);

  const value = useMemo(
    () => ({
      session,
      auth,
      activateAuth,
      removeAuth,
    }),
    [session, auth, activateAuth, removeAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
