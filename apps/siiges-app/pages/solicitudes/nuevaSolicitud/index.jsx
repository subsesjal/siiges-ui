import { Layout, SnackAlert } from '@siiges-ui/shared';
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
  const [form, setForm] = useState();
  const [error, setError] = useState({});
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const values = {
    form,
    error,
    setNoti,
    solicitudErrors: '',
  };
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
        />
        {module === 0 && <PlanEstudios nextModule={nextModule} />}
        {module === 1 && <DatosGenerales nextModule={nextModule} />}
        {module === 2 && <Plantel nextModule={nextModule} />}
        {module === 3 && <Anexos nextModule={nextModule} />}
        {module === 4 && <EvaluacionCurricular nextModule={nextModule} />}
      </Layout>
    );
  }
  return (
    <>
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
      <SnackAlert
        open={noti.open}
        close={() => {
          setNoti(false);
        }}
        type={noti.type}
        mensaje={noti.message}
      />
    </>
  );
}

export default newRequest;
