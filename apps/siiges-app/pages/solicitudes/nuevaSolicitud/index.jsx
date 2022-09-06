import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';
import { ModuleHeader, DatosGenerales } from '@siiges-ui/solicitudes';
import Plantel from '@siiges-ui/solicitudes/src/components/NuevaSolicitud/Plantel';
import PlanEstudios from '@siiges-ui/solicitudes/src/components/NuevaSolicitud/PlanEstudios';
import Anexos from '@siiges-ui/solicitudes/src/components/NuevaSolicitud/Anexos';
import EvaluacionCurricular from '@siiges-ui/solicitudes/src/components/NuevaSolicitud/EvaluacionCurricular';

const steps = [
  'Datos generales',
  'Plantel',
  'Plan de estudios',
  'Anexos',
  'Evaluacion curricular',
];

function newRequest() {
  const [module, setModule] = useState(0);
  const nextModule = () => {
    setModule(module + 1);
  };
  return (
    <Layout type={false}>
      <ModuleHeader
        steps={steps}
        type="Nueva solicitud"
        date="22 de Agosto 2022"
        nextModule={nextModule}
        module={module}
      />
      {module === 0 && <DatosGenerales />}
      {module === 1 && <Plantel />}
      {module === 2 && <PlanEstudios />}
      {module === 3 && <Anexos />}
      {module === 4 && <EvaluacionCurricular />}
    </Layout>
  );
}

export default newRequest;
