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

export function DatosGeneralesProvider({ children, solicitud }) {
  const { session } = useContext(Context);
  const { institucion: fetchedInstitucion } = getInstitucionUsuario(session);
  const [institucion, setInstitucion] = useState({});
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
    if (solicitud?.programa?.plantel?.institucion && session.rol !== 'representante') {
      setInstitucion(solicitud.programa.plantel.institucion);
    } else {
      setInstitucion(fetchedInstitucion || {});
    }
  }, [solicitud, session, fetchedInstitucion]);

  useEffect(() => {
    if (institucion?.id) {
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
      solicitud,
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
      solicitud,
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

DatosGeneralesProvider.defaultProps = {
  solicitud: {},
};

DatosGeneralesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  solicitud: PropTypes.shape({
    id: PropTypes.number,
    programa: PropTypes.shape({
      plantel: PropTypes.shape({
        institucion: PropTypes.shape({
          id: PropTypes.number,
        }),
      }),
    }),
  }),
};

export default DatosGeneralesContext;
