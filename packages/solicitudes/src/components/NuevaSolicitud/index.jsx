import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
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
  isLoading,
  setIsLoading,
}) {
  const router = useRouter();
  const [modalidad, setModalidad] = useState('escolarizada');
  const [module, setModule] = useState(0);
  const [id, setId] = useState(solicitudId);
  const [programaId, setProgramaId] = useState('');

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
      setModule((prevModule) => prevModule + 1);
    }
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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    ) : null;
  };

  return (
    <ObservacionesProvider>
      <ModuleHeader
        steps={steps[modalidad].map((component) => getStepName(component))}
        type="Nueva solicitud"
        date="22 de Agosto 2022"
        nextModule={nextModule}
        module={module}
        id={id}
      />
      {renderModule()}
    </ObservacionesProvider>
  );
}

NuevaSolicitud.propTypes = {
  type: PropTypes.string.isRequired,
  solicitudId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};
