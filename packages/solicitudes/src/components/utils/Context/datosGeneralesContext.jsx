import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { getInstitucionUsuario } from '@siiges-ui/instituciones';
import { Context } from '@siiges-ui/shared';

const DatosGeneralesContext = createContext();

export function DatosGeneralesProvider({ children }) {
  const { session } = useContext(Context);
  const institucion = getInstitucionUsuario(session);
  const [form, setForm] = useState({
    1: {},
    2: { persona: { domicilio: { estadoId: 14 } } },
    3: {},
  });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [formDiligencias, setFormDiligencias] = useState({
    persona: {},
  });
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [diligencias, setDiligencias] = useState([]);
  const [diligenciasRows, setDiligenciasRows] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (institucion) {
      setForm((prevForm) => ({
        ...prevForm,
        1: {
          ...prevForm[1],
          id: institucion.id,
        },
      }));
    }
  }, [institucion]);

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
      diligencias,
      setDiligencias,
      institucion,
      initialValues,
      setInitialValues,
      formDiligencias,
      setFormDiligencias,
      diligenciasRows,
      setDiligenciasRows,
    }),
    [
      form,
      error,
      errors,
      noti,
      disabled,
      diligencias,
      institucion,
      initialValues,
      formDiligencias,
      diligenciasRows,
    ],
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
