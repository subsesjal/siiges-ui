import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const PlantelContext = createContext();

export function PlantelProvider({ children, plantelId }) {
  const [form, setForm] = useState({
    1: {},
    2: {},
    3: Array(11)
      .fill(0)
      .map((_, index) => ({
        higieneId: index + 1,
        cantidad: 0,
      })),
    4: {},
    5: {},
    6: {},
  });
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [seguridad, setSeguridad] = useState(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        plantelId,
        seguridadSistemaId: index + 1,
        cantidad: 0,
      })),
  );
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
      seguridad,
      setSeguridad,
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
      seguridad,
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
  plantelId: PropTypes.number.isRequired,
};

export default PlantelContext;
