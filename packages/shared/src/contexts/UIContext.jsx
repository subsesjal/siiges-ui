import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

const UIContext = createContext(undefined);

/**
 * Hook para acceder al contexto de UI
 * @throws {Error} Si se usa fuera del UIProvider
 */
export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI debe ser usado dentro de un UIProvider');
  }
  return context;
};

/**
 * Provider de UI
 * Maneja estados globales de interfaz: notificaciones y loading
 */
export function UIProvider({ children }) {
  const [noti, setNotiState] = useState({
    open: false,
    type: 'info',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  /**
   * Muestra una notificación
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
   */
  const showNotification = useCallback((message, type = 'info') => {
    setNotiState({
      open: true,
      type,
      message,
    });
  }, []);

  /**
   * Oculta la notificación actual
   */
  const hideNotification = useCallback(() => {
    setNotiState((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  /**
   * Shortcuts para tipos específicos de notificaciones
   */
  const showSuccess = useCallback(
    (message) => showNotification(message, 'success'),
    [showNotification],
  );

  const showError = useCallback(
    (message) => showNotification(message, 'error'),
    [showNotification],
  );

  const showWarning = useCallback(
    (message) => showNotification(message, 'warning'),
    [showNotification],
  );

  const showInfo = useCallback(
    (message) => showNotification(message, 'info'),
    [showNotification],
  );

  const value = useMemo(
    () => ({
      // Estado de notificación
      noti,
      setNoti: setNotiState, // Para compatibilidad con código existente
      showNotification,
      hideNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo,

      // Estado de loading
      loading,
      setLoading,
    }),
    [
      noti,
      loading,
      showNotification,
      hideNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
