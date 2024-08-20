import React, {
  createContext,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

export const ObservacionesContext = createContext();

export function ObservacionesProvider({ children }) {
  const [createObservaciones, setCreateObservaciones] = useState(false);
  const [sectionStatus, setSectionStatus] = useState();
  const initialSeccions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    disabled: false,
  }));
  const [sections, setSections] = useState(initialSeccions);

  const contextValue = useMemo(
    () => ({
      sections,
      setSections,
      sectionStatus,
      setSectionStatus,
      createObservaciones,
      setCreateObservaciones,
    }),
    [
      sections,
      sectionStatus,
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
