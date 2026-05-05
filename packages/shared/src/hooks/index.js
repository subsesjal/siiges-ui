/**
 * Custom Hooks Module
 *
 * Colección de hooks personalizados reutilizables
 */

export { default as useApi } from './useApi';
export { default as useNotification } from './useNotification';
export { default as useCheckMobileScreen } from './useCheckMobileScreen';
export { default as useShowFooter } from './useShowFooter';

// Re-exports de contextos para conveniencia
export { useAuth } from '../contexts/AuthContext';
export { useUI } from '../contexts/UIContext';
export { useUser } from '../contexts/UserContext';
export { useNavigation } from '../contexts/NavigationContext';
export { usePlantel } from '../contexts/PlantelContext';
