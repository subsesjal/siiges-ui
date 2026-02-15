import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';
import { UIProvider } from './UIContext';
import { UserProvider } from './UserContext';
import { NavigationProvider } from './NavigationContext';
import SnackAlert from '../components/Alert';
import { useUI } from './UIContext';

/**
 * Componente interno que renderiza el SnackAlert
 * Debe estar dentro de UIProvider para acceder al contexto
 */
function NotificationContainer() {
  const { noti, hideNotification } = useUI();

  return (
    <SnackAlert
      open={noti.open}
      close={hideNotification}
      type={noti.type}
      mensaje={noti.message}
    />
  );
}

/**
 * Provider principal que compone todos los contextos
 * Orden de anidación:
 * 1. AuthProvider - Debe ser el primero (otros dependen de él)
 * 2. UIProvider - Independiente
 * 3. UserProvider - Depende de AuthProvider
 * 4. NavigationProvider - Depende de AuthProvider
 */
export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <UIProvider>
        <UserProvider>
          <NavigationProvider>
            {children}
            <NotificationContainer />
          </NavigationProvider>
        </UserProvider>
      </UIProvider>
    </AuthProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * HOC para envolver componentes con todos los providers
 */
export function withAppProvider(Component) {
  return function WrappedComponent(props) {
    return (
      <AppProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </AppProvider>
    );
  };
}

export default AppProvider;
