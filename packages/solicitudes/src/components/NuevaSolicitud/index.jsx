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

const steps = {
  escolarizada: [
    'Plan de estudios',
    'Datos generales',
    'Plantel',
    'Anexos',
    'Evaluacion curricular',
  ],
  noEscolarizada: [
    'Plan de estudios',
    'Datos generales',
    'Plantel',
    'Plataforma educativa',
    'Anexos',
    'Evaluacion curricular',
  ],
};

export default function NuevaSolicitud({
  type,
  solicitudId,
  isLoading,
  setIsLoading,
}) {
  const router = useRouter();
  const [modalidad, setModalidad] = useState('escolarizada');
  const [module, setModule] = useState(0);
  const [id, setId] = useState(solicitudId || '');
  const [programaId, setProgramaId] = useState('');

  useEffect(() => {
    if (router.query.modalidad) {
      setModalidad(router.query.modalidad);
    }
  }, [router.query.modalidad]);

  const nextModule = () => {
    const currentSteps = modalidad === 'escolarizada' ? steps.escolarizada : steps.noEscolarizada;
    setModule((prevModule) => (prevModule < currentSteps.length - 1 ? prevModule + 1 : prevModule));
  };

  const renderModule = () => {
    const componentsMap = {
      0: (
        <PlanEstudios
          nextModule={nextModule}
          id={id}
          setId={setId}
          programaId={programaId}
          setProgramaId={setProgramaId}
          type={type}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ),
      1: (
        <DatosGenerales
          nextModule={nextModule}
          id={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ),
      2: (
        <Plantel
          nextModule={nextModule}
          id={id}
          programaId={programaId}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ),
      3:
        modalidad === 'noEscolarizada' ? (
          <PlataformaEducativa
            nextModule={nextModule}
            id={id}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Anexos
            nextModule={nextModule}
            id={id}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ),
      4:
        modalidad === 'escolarizada' ? (
          <Anexos
            nextModule={nextModule}
            id={id}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <EvaluacionCurricular
            nextModule={nextModule}
            id={id}
            programaId={programaId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ),
      5: modalidad === 'noEscolarizada' && (
        <EvaluacionCurricular
          nextModule={nextModule}
          id={id}
          programaId={programaId}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ),
    };

    return componentsMap[module] || null;
  };

  return (
    <ObservacionesProvider>
      <ModuleHeader
        steps={
          modalidad === 'escolarizada'
            ? steps.escolarizada
            : steps.noEscolarizada
        }
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

NuevaSolicitud.defaultProps = {
  solicitudId: '',
  type: null,
};

NuevaSolicitud.propTypes = {
  type: PropTypes.string,
  solicitudId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};
