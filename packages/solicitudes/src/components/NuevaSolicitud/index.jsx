import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ModuleHeader,
  DatosGenerales,
  Plantel,
  PlanEstudios,
  Anexos,
  EvaluacionCurricular,
  PlataformaEducativa,
} from '@siiges-ui/solicitudes';
import PropTypes from 'prop-types';

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

// eslint-disable-next-line react/prop-types
export default function NuevaSolicitud({ type, data, solicitudId }) {
  const router = useRouter();
  const [modalidad, setModalidad] = useState('escolarizada');
  const [module, setModule] = useState(0);
  const [id, setId] = useState('');
  const [programaId, setProgramaId] = useState('');

  useEffect(() => {
    if (router.query.modalidad) {
      setModalidad(router.query.modalidad);
    }

    if (solicitudId) {
      setId(solicitudId);
    }
  }, [router.query.modalidad, solicitudId]);

  const nextModule = () => setModule((prevModule) => prevModule + 1);

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
          data={data}
        />
      ),
      1: <DatosGenerales nextModule={nextModule} id={id} />,
      2: <Plantel nextModule={nextModule} id={id} programaId={programaId} />,
      3:
        modalidad === 'noEscolarizada' ? (
          <PlataformaEducativa nextModule={nextModule} id={id} />
        ) : (
          <Anexos nextModule={nextModule} id={id} />
        ),
      4:
        modalidad === 'escolarizada' ? (
          <Anexos nextModule={nextModule} id={id} />
        ) : (
          <EvaluacionCurricular
            nextModule={nextModule}
            id={id}
            programaId={programaId}
          />
        ),
      5: modalidad === 'noEscolarizada' && (
        <EvaluacionCurricular
          nextModule={nextModule}
          id={id}
          programaId={programaId}
        />
      ),
    };

    return componentsMap[module] || null;
  };
  return (
    <>
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
    </>
  );
}

NuevaSolicitud.defaultProps = {
  solicitudId: null,
};

NuevaSolicitud.propTypes = {
  type: PropTypes.string.isRequired,
  solicitudId: PropTypes.number,
};
