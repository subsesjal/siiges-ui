import { ButtonStyled, Context } from '@siiges-ui/shared';
import React, { useContext, useState, useCallback } from 'react';
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
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
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
  const [newSubmit, setNewSubmit] = useState(true);
  const { setNoti, session } = useContext(Context);
  const validations = useContext(SolicitudContext);
  const datosGeneralesValidations = useContext(DatosGeneralesContext);
  const plantelesValidations = useContext(PlantelContext);
  const evaluacionCurricular = useEvaluacionCurricular();
  const router = useRouter();
  const { setCreateObservaciones } = useContext(TablesPlanEstudiosContext);
  let submit;

  const isControlDocumental = session.rol === 'control_documental';
  const buttonText = isControlDocumental
    ? 'Guardar observaciones'
    : 'Terminar Sección';
  const buttonTextEnd = isControlDocumental
    ? 'Guardar observaciones'
    : 'Terminar Solicitud';

  function PlanEstudios() {
    if (isControlDocumental) {
      return setCreateObservaciones(true);
    }
    if (sectionTitle === 9) {
      return submitTrayectoriaEducativa(validations, sections, id);
    }
    return null;
  }

  const sectionFunctions = {
    'Datos Generales': {
      1: useCallback(
        () => submitInstitucion(datosGeneralesValidations, sections, setNoti),
        [datosGeneralesValidations, sections],
      ),
      2: useCallback(
        () => submitRepresentante(datosGeneralesValidations, sections, setNoti),
        [datosGeneralesValidations, sections],
      ),
    },
    Plantel: {
      1: () => submitEditPlantel(plantelesValidations, sections, id, setNoti, router),
      2: () => submitDescripcionPlantel(
        plantelesValidations,
        setNoti,
        router.query.plantel,
      ),
      3: () => submitHigienesPlantel(
        plantelesValidations,
        setNoti,
        router.query.plantel,
      ),
      6: () => submitRatificacion(plantelesValidations, setNoti),
    },
    'Evaluación Curricular': {
      1: () => submitEvaluacionCurricular(evaluacionCurricular, setNoti),
    },
    'Plan de estudios': () => PlanEstudios(),
  };

  if (sectionFunctions[sectionTitle]) {
    if (typeof sectionFunctions[sectionTitle] === 'function') {
      submit = sectionFunctions[sectionTitle];
    } else if (sectionFunctions[sectionTitle][sections]) {
      submit = sectionFunctions[sectionTitle][sections];
    }
  } else if (newSubmit) {
    if (type !== 'editar') {
      submit = () => submitNewSolicitud(validations, setNewSubmit);
    } else {
      submit = () => submitEditSolicitud(validations, sections, id);
    }
  } else {
    submit = () => submitEditSolicitud(validations, sections, id);
  }

  return (
    <>
      {position === 'first' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={9}>
            <ButtonStyled
              text={buttonText}
              alt={buttonText}
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
              text={buttonText}
              alt={buttonText}
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
              text={buttonTextEnd}
              alt={buttonTextEnd}
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
              text="Terminar solicitud"
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
