import { ButtonStyled, Context } from '@siiges-ui/shared';
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
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
import submitEvaluacionCurricular from '../utils/submitEvaluacionCurricular';
import submitTrayectoriaEducativa from '../utils/submitTrayectoriaeducativa';

export default function ButtonSection({
  type,
  id,
  sections,
  position,
  next,
  prev,
  sectionTitle,
}) {
  const router = useRouter();
  const { setNoti } = useContext(Context);
  const validations = useContext(SolicitudContext);
  const datosGeneralesValidations = useContext(DatosGeneralesContext);
  const plantelesValidations = useContext(PlantelContext);
  const evaluacionCurricular = useEvaluacionCurricular();

  const submitFunctionMap = {
    'Datos Generales': {
      1: useCallback(
        () => submitInstitucion(datosGeneralesValidations, sections, setNoti),
        [datosGeneralesValidations, sections],
      ),
      2: useCallback(
        () => submitRepresentante(datosGeneralesValidations, sections, setNoti),
        [datosGeneralesValidations, sections],
      ),
      // Placeholder for section 3 action
    },
    Plantel: {
      1: useCallback(
        () => submitEditPlantel(
          plantelesValidations,
          sections,
          id,
          setNoti,
          router,
        ),
        [plantelesValidations, sections, id],
      ),
      2: useCallback(
        () => submitDescripcionPlantel(
          plantelesValidations,
          setNoti,
          router.query.plantel,
        ),
        [plantelesValidations],
      ),
      3: useCallback(
        () => submitHigienesPlantel(
          plantelesValidations,
          setNoti,
          router.query.plantel,
        ),
        [plantelesValidations],
      ),
      6: useCallback(
        () => submitRatificacion(plantelesValidations, setNoti),
        [plantelesValidations],
      ),
    },
    'Evaluación Curricular': {
      1: useCallback(
        () => submitEvaluacionCurricular(evaluacionCurricular, setNoti),
        [evaluacionCurricular],
      ),
    },
    'Plan de estudios': {
      9: useCallback(
        () => submitTrayectoriaEducativa(validations, sections, id),
        [validations, sections, id],
      ),
      default: useCallback(() => {
        if (type !== 'editar') {
          submitNewSolicitud(validations);
        } else {
          submitEditSolicitud(validations, sections, id);
        }
      }, [type, validations, sections, id]),
    },
  };

  const submit = submitFunctionMap[sectionTitle]?.[sections]
    || submitFunctionMap[sectionTitle]?.default
    || (() => console.warn('No submit function configured for this section'));

  return (
    <>
      {position === 'first' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={9}>
            <ButtonStyled
              text="Terminar sección"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonStyled
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              type="success"
              onclick={next}
            />
          </Grid>
        </Grid>
      )}
      {position === 'middle' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={3}>
            <ButtonStyled
              text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              type="success"
              onclick={prev}
            />
          </Grid>
          <Grid item xs={6}>
            <ButtonStyled
              text="Terminar sección"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonStyled
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              type="success"
              onclick={next}
            />
          </Grid>
        </Grid>
      )}
      {position === 'last' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={6}>
            <ButtonStyled
              text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              type="success"
              onclick={prev}
            />
          </Grid>
          <Grid item xs={6}>
            <ButtonStyled
              text="Terminar sección"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
        </Grid>
      )}
      {position === 'only' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={12}>
            <ButtonStyled
              text="Terminar sección"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

ButtonSection.defaultProps = {
  type: null,
};

ButtonSection.propTypes = {
  type: PropTypes.string,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  sections: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};
