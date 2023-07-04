import React, {
  createContext, useState, useMemo, useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import SolicitudContext from './solicitudContext';

export const AsignaturasContext = createContext();

export function AsignaturasProvider({ children }) {
  const [asignaturasList, setAsignaturasList] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [error, setError] = useState({});
  const [errors, setErrors] = useState({});
  const { id, setNoti } = useContext(SolicitudContext);
  const [form, setForm] = useState({ tipo: 1 });

  useEffect(() => {
    if (id) {
      setForm((prevForm) => ({
        ...prevForm,
        programaId: id,
      }));
    }
  }, [id]);

  const area = [
    { id: 1, nombre: 'Formacion General' },
    { id: 2, nombre: 'Formacion Basica' },
    { id: 3, nombre: 'Formacion Disciplinar' },
    { id: 4, nombre: 'Formacion Tecnica' },
    { id: 5, nombre: 'Formacion Especializante' },
  ];

  const grados = {
    semestral: [
      { id: 1, nombre: 'Primer Semestre' },
      { id: 2, nombre: 'Segundo Semestre' },
      { id: 3, nombre: 'Tercer Semestre' },
      { id: 4, nombre: 'Cuarto Semestre' },
      { id: 5, nombre: 'Quinto Semestre' },
      { id: 6, nombre: 'Sexto Semestre' },
      { id: 7, nombre: 'Septimo Semestre' },
      { id: 8, nombre: 'Octavo Semestre' },
      { id: 9, nombre: 'Noveno Semestre' },
      { id: 10, nombre: 'Decimo Semestre' },
    ],
    cuatrimestral: [
      { id: 11, nombre: 'Primer Cuatrimestre' },
      { id: 12, nombre: 'Segundo Cuatrimestre' },
      { id: 13, nombre: 'Tercer Cuatrimestre' },
      { id: 14, nombre: 'Cuarto Cuatrimestre' },
      { id: 15, nombre: 'Quinto Cuatrimestre' },
      { id: 16, nombre: 'Sexto Cuatrimestre' },
      { id: 17, nombre: 'Septimo Cuatrimestre' },
      { id: 18, nombre: 'Octavo Cuatrimestre' },
      { id: 19, nombre: 'Noveno Cuatrimestre' },
      { id: 20, nombre: 'Decimo Cuatrimestre' },
      { id: 21, nombre: 'Undecimo Cuatrimestre' },
      { id: 22, nombre: 'Duodecimo Cuatrimestre' },
    ],
    flexibleCuatrimestral: [{ id: 23, nombre: 'Flexible Cuatrimestral' }],
    flexibleSemestral: [{ id: 24, nombre: 'Flexible Semestral' }],
    optativa: [{ id: 25, nombre: 'Optativa' }],
  };

  const contextValue = useMemo(
    () => ({
      asignaturasList,
      setAsignaturasList,
      initialValues,
      setInitialValues,
      error,
      setError,
      errors,
      setErrors,
      form,
      setForm,
      id,
      setNoti,
      area,
      grados,
    }),
    [
      asignaturasList,
      setAsignaturasList,
      initialValues,
      setInitialValues,
      error,
      setError,
      errors,
      setErrors,
      form,
      setForm,
      id,
      setNoti,
      area,
      grados,
    ],
  );

  return (
    <AsignaturasContext.Provider value={contextValue}>
      {children}
    </AsignaturasContext.Provider>
  );
}

AsignaturasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
