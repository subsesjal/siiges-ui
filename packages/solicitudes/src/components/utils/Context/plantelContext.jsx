import React, { createContext, useState, useMemo } from 'react';
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
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [formDiligencias, setFormDiligencias] = useState({});
  const [formInfraestructuras, setFormInfraestructuras] = useState({});
  const [diligencias, setDiligencias] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [infraestructuras, setInfraestructuras] = useState([]);

  const value = useMemo(
    () => ({
      form,
      error,
      errors,
      disabled,
      diligencias,
      initialValues,
      formDiligencias,
      selectedCheckboxes,
      formInfraestructuras,
      infraestructuras,
      setDiligencias,
      setError,
      setErrors,
      setDisabled,
      setForm,
      setInitialValues,
      setFormDiligencias,
      setSelectedCheckboxes,
      setFormInfraestructuras,
      setInfraestructuras,
    }),
    [
      form,
      error,
      errors,
      disabled,
      diligencias,
      initialValues,
      formDiligencias,
      selectedCheckboxes,
      formInfraestructuras,
      infraestructuras,
    ],
  );

  return (
    <PlantelContext.Provider value={value}>{children}</PlantelContext.Provider>
  );
}

PlantelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlantelContext;
