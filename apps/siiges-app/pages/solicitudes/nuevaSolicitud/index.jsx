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
import { solicitudContext } from '@siiges-ui/solicitudes/src/components/utils/Context/centextSolicitudes';

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

  const nextModule = () => {
    setModule(module + 1);
  };

  if (modalidad === 'escolarizada') {
    return (
      <solicitudContext.Provider>
        <Layout type={false}>
          <ModuleHeader
            steps={stepsEscolarizada}
            type="Nueva solicitud"
            date="22 de Agosto 2022"
            nextModule={nextModule}
            module={module}
          />
          {module === 0 && <PlanEstudios nextModule={nextModule} />}
          {module === 1 && <DatosGenerales nextModule={nextModule} />}
          {module === 2 && <Plantel nextModule={nextModule} />}
          {module === 3 && <Anexos nextModule={nextModule} />}
          {module === 4 && <EvaluacionCurricular nextModule={nextModule} />}
        </Layout>
      </solicitudContext.Provider>
    );
  }
  return (
    <solicitudContext.Provider>
      <Layout type={false}>
        <ModuleHeader
          steps={stepsNoEscolarizada}
          type="Nueva solicitud"
          date="22 de Agosto 2022"
          nextModule={nextModule}
          module={module}
        />
        {module === 0 && <PlanEstudios nextModule={nextModule} />}
        {module === 1 && <DatosGenerales nextModule={nextModule} />}
        {module === 2 && <Plantel nextModule={nextModule} />}
        {module === 3 && <PlataformaEducativa nextModule={nextModule} />}
        {module === 4 && <Anexos nextModule={nextModule} />}
        {module === 5 && <EvaluacionCurricular nextModule={nextModule} />}
      </Layout>
      {/* <SnackAlert
        open={noti.open}
        close={() => {
          setNoti(false);
        }}
        type={noti.type}
        mensaje={noti.message}
      /> */}
    </solicitudContext.Provider>
  );
}

export default newRequest;
