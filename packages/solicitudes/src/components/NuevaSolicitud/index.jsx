import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import {
  ModuleHeader,
  DatosGenerales,
  Plantel,
  PlanEstudios,
  Anexos,
  EvaluacionCurricular,
  PlataformaEducativa,
} from '@siiges-ui/solicitudes';
import { getData } from '@siiges-ui/shared';
import { ObservacionesProvider } from '../utils/Context/observacionesContext';

const componentSteps = [
  { name: DatosGenerales, stepName: 'Datos Generales' },
  { name: Plantel, stepName: 'Plantel' },
  { name: PlanEstudios, stepName: 'Plan de Estudios' },
  { name: Anexos, stepName: 'Anexos' },
  { name: EvaluacionCurricular, stepName: 'Evaluación Curricular' },
  { name: PlataformaEducativa, stepName: 'Plataforma Educativa' },
];

const getStepName = (component) => componentSteps.find(
  ({ name: step }) => step.name === component.name,
)?.stepName || '';

const buildSteps = (modalidad, tipoSolicitudId) => {
  const baseCommonSteps = [PlanEstudios, DatosGenerales, Plantel, Anexos];

  if (tipoSolicitudId !== 3) {
    baseCommonSteps.push(EvaluacionCurricular);
  }

  const modalidadMapSteps = {
    escolarizada: [...baseCommonSteps],
    mixta: [...baseCommonSteps],
    dual: [...baseCommonSteps],
    noEscolarizada: [
      ...baseCommonSteps.slice(0, 3),
      PlataformaEducativa,
      ...baseCommonSteps.slice(3),
    ],
  };

  return modalidadMapSteps[modalidad] || [];
};

export default function NuevaSolicitud({ type, solicitudId = '' }) {
  const router = useRouter();
  const [modalidad, setModalidad] = useState('escolarizada');
  const [module, setModule] = useState(0);
  const [id, setId] = useState(solicitudId);
  const [programaId, setProgramaId] = useState('');
  const [solicitud, setSolicitud] = useState({});
  const [displayDate, setDisplayDate] = useState('');
  const [stepsList, setStepsList] = useState([]);
  const { solicitudType } = router.query;

  const READ_ONLY_MODES = ['consultar', 'observaciones'];
  const isDisabled = READ_ONLY_MODES.includes(type);

  useEffect(() => {
    setId(solicitudId);
    if (solicitudId) {
      const fetchSolicitud = async () => {
        const response = await getData({
          endpoint: `/solicitudes/${solicitudId}`,
        });
        setSolicitud(response.data || {});
      };
      fetchSolicitud();
    }
  }, [solicitudId]);

  useEffect(() => {
    if (solicitud?.createdAt) {
      setDisplayDate(
        dayjs(solicitud.createdAt).locale('es').format('DD [de] MMMM YYYY'),
      );
    } else {
      setDisplayDate(dayjs().locale('es').format('DD [de] MMMM YYYY'));
    }
  }, [solicitud]);

  useEffect(() => {
    const modalidadMap = {
      1: 'escolarizada',
      2: 'noEscolarizada',
      3: 'mixta',
      4: 'dual',
    };

    if (router.query.modalidad) {
      setModalidad(modalidadMap[router.query.modalidad] || 'escolarizada');
    }
  }, [router.query.modalidad]);

  useEffect(() => {
    setStepsList(buildSteps(modalidad, solicitud?.tipoSolicitudId));
  }, [modalidad, solicitud?.tipoSolicitudId]);

  const nextModule = () => {
    if (module < stepsList.length - 1) {
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

  const optionsTypeSolicitudes = [
    { id: 1, nombre: 'Nueva Solicitud' },
    { id: 2, nombre: 'Refrendo' },
    { id: 3, nombre: 'Cambio de Domicilio' },
  ];

  const getSolicitudTypeName = () => {
    if (solicitudType) return solicitudType;
    if (!solicitud?.tipoSolicitudId) return 'Nueva solicitud';
    const foundType = optionsTypeSolicitudes.find(
      (option) => option.id === solicitud.tipoSolicitudId,
    );
    return foundType ? foundType.nombre : 'Nueva solicitud';
  };

  const renderModule = () => {
    const Component = stepsList[module];
    return Component ? (
      <Component
        nextModule={nextModule}
        id={id}
        setId={setId}
        programaId={programaId}
        setProgramaId={setProgramaId}
        solicitud={solicitud}
        type={type}
        isDisabled={isDisabled}
        tipoSolicitudId={solicitud?.tipoSolicitudId}
      />
    ) : null;
  };

  return (
    <ObservacionesProvider>
      <ModuleHeader
        steps={stepsList.map((component) => getStepName(component))}
        isEditOrView={type}
        type={getSolicitudTypeName()}
        date={displayDate}
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
