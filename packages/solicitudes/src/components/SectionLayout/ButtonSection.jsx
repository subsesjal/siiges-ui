import { ButtonSimple, Context, createRecord } from '@siiges-ui/shared';
import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { getInstitucionUsuario } from '@siiges-ui/instituciones';
import submitEditPlantel from '../utils/submitEditPlantel';
import submitNewSolicitud from '../utils/submitNewSolicitud';
import submitEditSolicitud from '../utils/submitEditSolicitud';
import SolicitudContext from '../utils/Context/solicitudContext';
import submitInstitucion from '../utils/submitInstitucion';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import submitRepresentante from '../utils/submitRepresentante';
import PlantelContext from '../utils/Context/plantelContext';
import submitDescripcionPlantel from '../utils/submitDescripcionPlantel';
import submitHigienesPlantel from '../utils/submitHigienesPlantel';
import submitRatificacion from '../utils/submitRatificacion';
import { useEvaluacionCurricular } from '../utils/Context/evaluacionCurricularContext';
import { ObservacionesContext } from '../utils/Context/observacionesContext';
import submitEvaluacionCurricular from '../utils/submitEvaluacionCurricular';
import submitTrayectoriaEducativa from '../utils/submitTrayectoriaeducativa';

export default function ButtonSection({
  type,
  id,
  sections: currentSection,
  position,
  next,
  prev,
  sectionTitle,
}) {
  const [newSubmit, setNewSubmit] = useState(true);
  const [currentSectionStatus, setCurrentSectionStatus] = useState(null);

  const {
    setNoti, session, loading, setLoading,
  } = useContext(Context);
  const institucion = getInstitucionUsuario(session);
  const validations = useContext(SolicitudContext);
  const evaluacionCurricular = useEvaluacionCurricular();
  const plantelesValidations = useContext(PlantelContext);
  const datosGeneralesValidations = useContext(DatosGeneralesContext);
  const {
    setCreateObservaciones,
    setSections,
    sections: sectionState,
  } = useContext(ObservacionesContext);
  const router = useRouter();

  const isControlDocumental = session.rol === 'control_documental';
  const buttonText = isControlDocumental
    ? 'Guardar observaciones'
    : 'Terminar Sección';
  const buttonTextEnd = buttonText;

  const calculateSectionOffset = () => {
    const moduleOffsets = {
      'Plan de estudios': 0,
      'Datos Generales': 10,
      Plantel: 13,
      Anexos: 19,
      'Evaluación Curricular': 20,
    };

    const offset = moduleOffsets[sectionTitle] || 0;
    return currentSection + offset;
  };

  useEffect(() => {
    const offsetSection = calculateSectionOffset();

    const foundSection = sectionState.find(
      (section) => section.id === offsetSection,
    );

    if (foundSection) {
      setCurrentSectionStatus(() => foundSection.disabled);
    }
  }, [sectionState, currentSection, sectionTitle]);

  function observaciones() {
    setCreateObservaciones(true);
  }

  const handleCreateRecord = async (commentData) => {
    try {
      const offsetSection = calculateSectionOffset();
      const response = await createRecord({
        data: commentData,
        endpoint: `/solicitudes/${id}/secciones/${offsetSection}`,
      });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setNoti({
          message: 'Esta sección ya puede ser editada.',
          type: 'success',
        });

        setSections((prevSections) => prevSections.map(
          (section) => (section.id === response.data.seccionId
            ? { ...section, disabled: response.data.isClosed }
            : section),
        ));
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al reactivar la sección!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al reactivar la sección!',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateNewSolicitud = () => {
    if (newSubmit) {
      if (type !== 'editar') {
        submitNewSolicitud(validations, setNewSubmit, setLoading, setSections, router);
      } else {
        submitEditSolicitud(validations, currentSection, id, setLoading, setSections);
      }
    } else {
      submitEditSolicitud(validations, currentSection, id, setLoading, setSections);
    }
  };

  const sectionFunctions = {
    'Plan de estudios': {
      1: validateNewSolicitud,
      2: () => handleCreateRecord({ commentData: {}, query: { id } }),
      3: validateNewSolicitud,
      4: validateNewSolicitud,
      5: validateNewSolicitud,
      6: () => handleCreateRecord({ commentData: {}, query: { id } }),
      7: () => handleCreateRecord({ commentData: {}, query: { id } }),
      8: () => handleCreateRecord({ commentData: {}, query: { id } }),
      9: () => submitTrayectoriaEducativa(validations, setLoading, setSections, id),
      10: () => handleCreateRecord({ commentData: {}, query: { id } }),
    },
    'Datos Generales': {
      1: useCallback(
        () => submitInstitucion(
          datosGeneralesValidations,
          currentSection,
          setNoti,
          setLoading,
          setSections,
          id,
        ),
        [datosGeneralesValidations],
      ),
      2: useCallback(
        () => submitRepresentante(
          datosGeneralesValidations,
          currentSection,
          setNoti,
          setLoading,
          setSections,
          id,
        ),
        [datosGeneralesValidations],
      ),
      3: () => handleCreateRecord({ commentData: {}, query: { id } }),
    },
    Plantel: {
      1: () => submitEditPlantel(
        plantelesValidations,
        currentSection,
        id,
        setNoti,
        router,
        setLoading,
        setSections,
      ),
      2: () => submitDescripcionPlantel(
        plantelesValidations,
        setNoti,
        setLoading,
        institucion.id,
        setSections,
        id,
      ),
      3: () => submitHigienesPlantel(
        plantelesValidations,
        setNoti,
        setLoading,
        setSections,
        id,
      ),
      4: () => handleCreateRecord({ commentData: {}, query: { id } }),
      5: () => handleCreateRecord({ commentData: {}, query: { id } }),
      6: () => submitRatificacion(
        plantelesValidations,
        setNoti,
        setLoading,
        setSections,
        id,
      ),
    },
    Anexos: {
      1: () => handleCreateRecord({ commentData: {}, query: { id } }),
    },
    'Evaluación Curricular': {
      1: () => submitEvaluacionCurricular(
        evaluacionCurricular,
        setNoti,
        setLoading,
        setSections,
        id,
      ),
    },
  };

  const submit = async () => {
    if (isControlDocumental) {
      observaciones();
    } else if (sectionFunctions[sectionTitle]) {
      if (currentSectionStatus === true) {
        await handleCreateRecord({ commentData: {}, query: { id } });
      } else if (sectionFunctions[sectionTitle][currentSection]) {
        setLoading(true);
        sectionFunctions[sectionTitle][currentSection]();
      }
    }
  };

  const buttonTextDynamic = currentSectionStatus === true ? 'Habilitar Sección' : buttonText;

  const buttonTextEndDynamic = currentSectionStatus === true ? 'Habilitar Sección' : buttonTextEnd;

  return (
    <>
      {['first', 'middle', 'last', 'only'].map(
        (pos) => position === pos && (
        <Grid
          container
          spacing={1}
          sx={{ mt: 0.5 }}
          justifyContent="right"
          key={pos}
        >
          {position !== 'only' && position !== 'first' && (
          <Grid item>
            <ButtonSimple
              text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              type="success"
              onClick={prev}
            />
          </Grid>
          )}
          {type !== 'consultar' && (
          <Grid item>
            <ButtonSimple
              text={
                      position === 'last' || position === 'only'
                        ? buttonTextEndDynamic
                        : buttonTextDynamic
                    }
              type="success"
              onClick={!loading ? submit : null}
            />
          </Grid>
          )}
          {position !== 'last' && position !== 'only' && (
          <Grid item>
            <ButtonSimple
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              type="success"
              onClick={next}
            />
          </Grid>
          )}
        </Grid>
        ),
      )}
    </>
  );
}

ButtonSection.defaultProps = {
  type: null,
  id: null,
};

ButtonSection.propTypes = {
  type: PropTypes.string,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  sections: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sectionTitle: PropTypes.string.isRequired,
};
