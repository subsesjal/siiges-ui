import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const DatosGeneralesContext = createContext();

export function DatosGeneralesProvider({ children }) {
  const [form, setForm] = useState({
    1: {},
    2: {},
    3: {},
  });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  const value = useMemo(
    () => ({
      form,
      setForm,
      error,
      setError,
      errors,
      setErrors,
      noti,
      setNoti,
      disabled,
      setDisabled,
    }),
    [form, error, errors, noti],
  );

  return (
    <DatosGeneralesContext.Provider value={value}>
      {children}
    </DatosGeneralesContext.Provider>
  );
}

DatosGeneralesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DatosGeneralesContext;
