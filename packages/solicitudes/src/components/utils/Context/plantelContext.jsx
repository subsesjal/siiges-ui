import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const PlantelContext = createContext();

export function PlantelProvider({ children, selectedPlantel, institucionId }) {
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [diligencias, setDiligencias] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [validNombres, setValidNombres] = useState(false);
  const [formDiligencias, setFormDiligencias] = useState({});
  const [infraestructuras, setInfraestructuras] = useState([]);
  const [institucionesAledanas, setInstitucionesAledanas] = useState([]);
  const [formInfraestructuras, setFormInfraestructuras] = useState({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [plantelId, setPlantelId] = useState(selectedPlantel);
  const [formInstitucionesAledanas, setFormInstitucionesAledanas] = useState({ plantelId });
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
    6: { institucionId, esNombreAutorizado: false },
  });
  const [seguridad, setSeguridad] = useState(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        plantelId,
        seguridadSistemaId: index + 1,
        cantidad: 0,
      })),
  );

  const value = useMemo(
    () => ({
      form,
      error,
      errors,
      setForm,
      setError,
      disabled,
      seguridad,
      setErrors,
      plantelId,
      diligencias,
      setDisabled,
      setSeguridad,
      validNombres,
      setPlantelId,
      initialValues,
      setDiligencias,
      setValidNombres,
      formDiligencias,
      infraestructuras,
      setInitialValues,
      setFormDiligencias,
      selectedCheckboxes,
      setInfraestructuras,
      formInfraestructuras,
      institucionesAledanas,
      setSelectedCheckboxes,
      setFormInfraestructuras,
      setInstitucionesAledanas,
      formInstitucionesAledanas,
      setFormInstitucionesAledanas,
    }),
    [
      form,
      error,
      errors,
      disabled,
      seguridad,
      plantelId,
      diligencias,
      validNombres,
      initialValues,
      formDiligencias,
      infraestructuras,
      selectedCheckboxes,
      formInfraestructuras,
      institucionesAledanas,
      formInstitucionesAledanas,
    ],
  );

  return (
    <PlantelContext.Provider value={value}>{children}</PlantelContext.Provider>
  );
}

PlantelProvider.propTypes = {
  children: PropTypes.node.isRequired,
  selectedPlantel: PropTypes.number.isRequired,
  institucionId: PropTypes.number.isRequired,
};

export default PlantelContext;
