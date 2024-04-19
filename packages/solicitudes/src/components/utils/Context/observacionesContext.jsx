import React, {
  createContext,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

export const ObservacionesContext = createContext();

export function ObservacionesProvider({ children }) {
  const [createObservaciones, setCreateObservaciones] = useState(false);

  const contextValue = useMemo(
    () => ({
      createObservaciones,
      setCreateObservaciones,
    }),
    [
      createObservaciones,
    ],
  );

  return (
    <ObservacionesContext.Provider value={contextValue}>
      {children}
    </ObservacionesContext.Provider>
  );
}

ObservacionesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
