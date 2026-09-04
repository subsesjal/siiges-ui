/**
 * Hook personalizado para manejar notificaciones
 * Proporciona una API simplificada para mostrar diferentes tipos de notificaciones
 *
 * @example
 * const notify = useNotification();
 * notify.success('Operación exitosa');
 * notify.error('Algo salió mal');
 */

import { useMemo } from 'react';
import { useUI } from '../contexts/UIContext';

export function useNotification() {
  const {
    showSuccess, showError, showWarning, showInfo,
  } = useUI();

  return useMemo(() => ({
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
  }), [showError, showInfo, showSuccess, showWarning]);
}

export default useNotification;
