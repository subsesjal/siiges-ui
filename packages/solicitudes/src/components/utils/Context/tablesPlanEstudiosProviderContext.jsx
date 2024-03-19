import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import SolicitudContext from './solicitudContext';

export const TablesPlanEstudiosContext = createContext();

export function TablesPlanEstudiosProvider({ children }) {
  const { id, setNoti, programaId } = useContext(SolicitudContext);
  const [formAsignaturas, setFormAsignaturas] = useState({ tipo: 1 });
  const [formAsignaturasFormacion, setFormAsignaturasFormacion] = useState({
    tipo: 2,
    areaId: 4,
  });
  const [formDocentes, setFormDocentes] = useState({
    esAceptado: true,
    asignaturasDocentes: [],
  });
  const [asignaturasList, setAsignaturasList] = useState([]);
  const [asignaturasFormacionList, setAsignaturasFormacionList] = useState([]);
  const [asignaturasTotalList, setAsignaturasTotalList] = useState([]);
  const [docentesList, setDocentesList] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [error, setError] = useState({});
  const [errors, setErrors] = useState({});
  const [createObservaciones, setCreateObservaciones] = useState(false);

  useEffect(() => {
    if (programaId) {
      setFormAsignaturas((prevForm) => ({
        ...prevForm,
        programaId,
      }));
      setFormAsignaturasFormacion((prevForm) => ({
        ...prevForm,
        programaId,
      }));
      setFormDocentes((prevForm) => ({
        ...prevForm,
        programaId,
      }));
    }
  }, [programaId]);

  const contextValue = useMemo(
    () => ({
      asignaturasList,
      setAsignaturasList,
      asignaturasTotalList,
      setAsignaturasTotalList,
      docentesList,
      setDocentesList,
      asignaturasFormacionList,
      setAsignaturasFormacionList,
      initialValues,
      setInitialValues,
      error,
      setError,
      errors,
      setErrors,
      formAsignaturas,
      setFormAsignaturas,
      formAsignaturasFormacion,
      setFormAsignaturasFormacion,
      formDocentes,
      setFormDocentes,
      id,
      setNoti,
      programaId,
      createObservaciones,
      setCreateObservaciones,
    }),
    [
      asignaturasList,
      setAsignaturasList,
      asignaturasFormacionList,
      setAsignaturasFormacionList,
      initialValues,
      setInitialValues,
      error,
      setError,
      errors,
      setErrors,
      formAsignaturas,
      setFormAsignaturas,
      formAsignaturasFormacion,
      setFormAsignaturasFormacion,
      formDocentes,
      setFormDocentes,
      id,
      setNoti,
      programaId,
      createObservaciones,
      setCreateObservaciones,
    ],
  );

  return (
    <TablesPlanEstudiosContext.Provider value={contextValue}>
      {children}
    </TablesPlanEstudiosContext.Provider>
  );
}

TablesPlanEstudiosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
