import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

export const EvaluacionCurricularContext = createContext();

export const useEvaluacionCurricular = () => useContext(EvaluacionCurricularContext);

export function EvaluacionCurricularProvider({ children, programaId }) {
  const [form, setForm] = useState({ programaId, estatus: 2 });
  const [error, setError] = useState({});
  const [errors, setErrors] = useState({});

  const contextValue = useMemo(() => ({
    form,
    setForm,
    error,
    setError,
    errors,
    setErrors,
  }), [form, error, errors]);

  return (
    <EvaluacionCurricularContext.Provider value={contextValue}>
      {children}
    </EvaluacionCurricularContext.Provider>
  );
}

EvaluacionCurricularProvider.defaultProps = {
  programaId: null,
};

EvaluacionCurricularProvider.propTypes = {
  children: PropTypes.node.isRequired,
  programaId: PropTypes.number,
};
