/**
 * Contexts Module
 *
 * Proporciona contextos especializados para manejar diferentes aspectos
 * del estado global de la aplicación de manera eficiente.
 *
 * @module contexts
 */

// Providers
export { AuthProvider, useAuth } from './AuthContext';
export { UIProvider, useUI } from './UIContext';
export { UserProvider, useUser } from './UserContext';
export { NavigationProvider, useNavigation } from './NavigationContext';
export { PlantelProvider, usePlantel } from './PlantelContext';
export { AppProvider, withAppProvider } from './AppProvider';

// Re-export para compatibilidad con código legacy
export { Context } from '../utils/handlers/context';
