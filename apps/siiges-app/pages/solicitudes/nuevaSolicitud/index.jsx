import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';
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

const stepsEscolarizada = [
  'Plan de estudios',
  'Datos generales',
  'Plantel',
  'Anexos',
  'Evaluacion curricular',
];

const stepsNoEscolarizada = [
  'Plan de estudios',
  'Datos generales',
  'Plantel',
  'Plataforma educativa',
  'Anexos',
  'Evaluacion curricular',
];

function newRequest() {
  const router = useRouter();
  const { query } = router;
  const { modalidad } = query;
  const [module, setModule] = useState(0);
  const [id, setId] = useState();

  const nextModule = () => {
    setModule(module + 1);
  };

  if (modalidad === 'escolarizada') {
    return (
      <Layout type={false}>
        <ModuleHeader
          steps={stepsEscolarizada}
          type="Nueva solicitud"
          date="22 de Agosto 2022"
          nextModule={nextModule}
          module={module}
          id={id}
        />
        {module === 0 && <PlanEstudios nextModule={nextModule} id={id} setId={setId} />}
        {module === 1 && <DatosGenerales nextModule={nextModule} id={id} />}
        {module === 2 && <Plantel nextModule={nextModule} id={id} />}
        {module === 3 && <Anexos nextModule={nextModule} id={id} />}
        {module === 4 && <EvaluacionCurricular nextModule={nextModule} id={id} />}
      </Layout>
    );
  }
  return (
    <Layout type={false}>
      <ModuleHeader
        steps={stepsNoEscolarizada}
        type="Nueva solicitud"
        date="22 de Agosto 2022"
        nextModule={nextModule}
        module={module}
      />
      {module === 0 && <PlanEstudios nextModule={nextModule} id={id} setId={setId} />}
      {module === 1 && <DatosGenerales nextModule={nextModule} id={id} />}
      {module === 2 && <Plantel nextModule={nextModule} id={id} />}
      {module === 3 && <PlataformaEducativa nextModule={nextModule} id={id} />}
      {module === 4 && <Anexos nextModule={nextModule} id={id} />}
      {module === 5 && <EvaluacionCurricular nextModule={nextModule} id={id} />}
    </Layout>
  );
}

export default newRequest;
