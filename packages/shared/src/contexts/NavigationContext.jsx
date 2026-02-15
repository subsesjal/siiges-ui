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
import { useAuth } from './AuthContext';
import { findRoute } from '../components/Drawer/utils/menuUsers';

const NavigationContext = createContext(undefined);

/**
 * Hook para acceder al contexto de navegación
 * @throws {Error} Si se usa fuera del NavigationProvider
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation debe ser usado dentro de un NavigationProvider');
  }
  return context;
};

/**
 * Provider de navegación
 * Maneja la sección actual basada en la ruta y rol del usuario
 */
export function NavigationProvider({ children }) {
  const router = useRouter();
  const { session } = useAuth();
  const [section, setSection] = useState(null);

  // Actualizar sección cuando cambia la ruta o el rol
  useEffect(() => {
    const currentSection = findRoute(router.route, session?.rol);
    if (currentSection) {
      setSection(currentSection);
    }
  }, [router.route, session?.rol]);

  /**
   * Navega a una ruta específica
   */
  const navigateTo = useCallback(
    (path) => {
      router.push(path);
    },
    [router],
  );

  /**
   * Navega hacia atrás
   */
  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * Actualiza la sección manualmente
   */
  const updateSection = useCallback((newSection) => {
    setSection(newSection);
  }, []);

  const value = useMemo(
    () => ({
      section,
      setSection: updateSection,
      currentRoute: router.route,
      navigateTo,
      navigateBack,
    }),
    [section, router.route, updateSection, navigateTo, navigateBack],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
