import { ButtonStyled, Context } from '@siiges-ui/shared';
import React, { useState, useContext } from 'react';
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

export default function ButtonSection({
  id,
  sections,
  position,
  next,
  prev,
  sectionTitle,
}) {
  const [newSubmit, setNewSubmit] = useState(true);
  const { setNoti } = useContext(Context);
  const validations = useContext(SolicitudContext);
  const datosGeneralesValidations = useContext(DatosGeneralesContext);
  const plantelesValidations = useContext(PlantelContext);
  const evaluacionCurricular = useEvaluacionCurricular();
  const router = useRouter();
  let submit;

  if (sectionTitle === 'Datos Generales') {
    if (sections === 1) {
      submit = () => {
        submitInstitucion(datosGeneralesValidations, sections, setNoti);
      };
    } else if (sections === 2) {
      submit = () => {
        submitRepresentante(datosGeneralesValidations, sections, setNoti);
      };
    } else if (sections === 3) {
      submit = () => {
        console.log(
          'Performing action for "Datos Generales" with sections === 3',
        );
      };
    }
  } else if (sectionTitle === 'Plantel') {
    if (sections === 1) {
      submit = () => {
        submitEditPlantel(plantelesValidations, sections, id, setNoti, router);
      };
    } else if (sections === 2) {
      submit = () => {
        submitDescripcionPlantel(
          plantelesValidations,
          setNoti,
          router.query.plantel,
        );
      };
    } else if (sections === 3) {
      submit = () => {
        submitHigienesPlantel(
          plantelesValidations,
          setNoti,
          router.query.plantel,
        );
      };
    } else if (sections === 6) {
      submit = () => {
        submitRatificacion(plantelesValidations, setNoti);
      };
    }
  } else if (sectionTitle === 'Evaluación Curricular') {
    if (sections === 1) {
      submit = () => {
        submitEvaluacionCurricular(evaluacionCurricular, setNoti);
      };
    }
  } else if (newSubmit) {
    submit = () => submitNewSolicitud(validations, setNewSubmit);
  } else {
    submit = () => submitEditSolicitud(validations, sections, id);
  }

  return (
    <>
      {position === 'first' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={9}>
            <ButtonStyled
              text="Terminar"
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
          <Grid item xs={5}>
            <ButtonStyled
              text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              type="success"
              onclick={prev}
            />
          </Grid>
          <Grid item xs={4}>
            <ButtonStyled
              text="Terminar"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
          <Grid item xs={2}>
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
          <Grid item xs={8}>
            <ButtonStyled
              text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
              type="success"
              onclick={prev}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonStyled
              text="Terminar"
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
              text="Terminar"
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

ButtonSection.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  sections: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};
