/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const solicitudContext = createContext();

function Provider({ children }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  const value = {
    form,
    setForm,
    error,
    setError,
    errors,
    setErrors,
    noti,
    setNoti,
  };
  return <solicitudContext.Provider value={value}>{children}</solicitudContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default {
  Provider,
  Consumer: solicitudContext.Consumer,
};
