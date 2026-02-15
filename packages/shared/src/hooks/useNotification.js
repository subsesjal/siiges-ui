/**
 * Hook personalizado para manejar notificaciones
 * Proporciona una API simplificada para mostrar diferentes tipos de notificaciones
 * 
 * @example
 * const notify = useNotification();
 * notify.success('Operación exitosa');
 * notify.error('Algo salió mal');
 */

import { useUI } from '../contexts/UIContext';

export function useNotification() {
  const { showSuccess, showError, showWarning, showInfo } = useUI();

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
  };
}

export default useNotification;
