import React, {
  createContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const PlantelContext = createContext();

export function PlantelProvider({ children }) {
  const [form, setForm] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [formDiligencias, setFormDiligencias] = useState({ });
  const [diligencias, setDiligencias] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  const value = useMemo(
    () => ({
      form,
      setForm,
      error,
      setError,
      errors,
      setErrors,
      disabled,
      setDisabled,
      diligencias,
      setDiligencias,
      initialValues,
      setInitialValues,
      formDiligencias,
      setFormDiligencias,
    }),
    [
      form,
      error,
      errors,
      disabled,
      diligencias,
      initialValues,
      formDiligencias,
    ],
  );

  return (
    <PlantelContext.Provider value={value}>
      {children}
    </PlantelContext.Provider>
  );
}

PlantelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlantelContext;
