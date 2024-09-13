import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'; // Import dayjs
import 'dayjs/locale/es'; // Import Spanish locale for dayjs
import {
  ModuleHeader,
  DatosGenerales,
  Plantel,
  PlanEstudios,
  Anexos,
  EvaluacionCurricular,
  PlataformaEducativa,
} from '@siiges-ui/solicitudes';
import { ObservacionesProvider } from '../utils/Context/observacionesContext';

const commonSteps = [
  PlanEstudios,
  DatosGenerales,
  Plantel,
  Anexos,
  EvaluacionCurricular,
];

const componentSteps = [
  { name: DatosGenerales, stepName: 'Datos Generales' },
  { name: Plantel, stepName: 'Plantel' },
  { name: PlanEstudios, stepName: 'Plan de Estudios' },
  { name: Anexos, stepName: 'Anexos' },
  { name: EvaluacionCurricular, stepName: 'Evaluación Curricular' },
  { name: PlataformaEducativa, stepName: 'Plataforma Educativa' },
];

const steps = {
  escolarizada: [...commonSteps],
  mixta: [...commonSteps],
  dual: [...commonSteps],
  noEscolarizada: [
    ...commonSteps.slice(0, 3),
    PlataformaEducativa,
    ...commonSteps.slice(3),
  ],
};

const getStepName = (component) => componentSteps
  .find(({ name: step }) => step.name === component.name).stepName;

export default function NuevaSolicitud({
  type,
  solicitudId = '',
}) {
  const router = useRouter();
  const [modalidad, setModalidad] = useState('escolarizada');
  const [module, setModule] = useState(0);
  const [id, setId] = useState(solicitudId);
  const [programaId, setProgramaId] = useState('');

  // Get current date using dayjs and format it in Spanish
  const currentDate = dayjs().locale('es').format('DD [de] MMMM YYYY');

  useEffect(() => {
    setId(solicitudId);
  }, [solicitudId]);

  useEffect(() => {
    const modalidadMap = {
      1: 'escolarizada',
      2: 'noEscolarizada',
      3: 'mixta',
      4: 'dual',
    };

    if (router.query.modalidad) {
      setModalidad(modalidadMap[router.query.modalidad]);
    }
  }, [router.query.modalidad]);

  const nextModule = () => {
    const stepList = steps[modalidad];
    if (module < stepList.length - 1) {
      setModule((position) => position + 1);
    }
  };

  const prevModule = () => {
    if (module >= 1) {
      setModule((position) => position - 1);
    }
  };

  const switchModule = (stepIndex) => {
    setModule(stepIndex);
  };

  const renderModule = () => {
    const Component = steps[modalidad][module];
    return Component ? (
      <Component
        nextModule={nextModule}
        id={id}
        setId={setId}
        programaId={programaId}
        setProgramaId={setProgramaId}
        type={type}
      />
    ) : null;
  };

  return (
    <ObservacionesProvider>
      <ModuleHeader
        steps={steps[modalidad].map((component) => getStepName(component))}
        isEditOrView={type}
        type="Nueva solicitud"
        date={currentDate}
        nextModule={nextModule}
        prevModule={prevModule}
        module={module}
        id={id}
        switchModule={switchModule}
      />
      {renderModule()}
    </ObservacionesProvider>
  );
}

NuevaSolicitud.propTypes = {
  type: PropTypes.string.isRequired,
  solicitudId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
