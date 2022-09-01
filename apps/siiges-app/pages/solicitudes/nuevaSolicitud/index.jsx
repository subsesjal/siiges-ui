import { Layout } from '@siiges-ui/shared';
import React from 'react';
import { ModuleHeader, DatosGenerales } from '@siiges-ui/solicitudes';

const steps = [
  'Datos generales',
  'Plantel',
  'Plan de estudios',
  'Anexos',
  'Evaluacion curricular',
];

function newRequest() {
  return (
    <Layout type={false}>
      <ModuleHeader
        steps={steps}
        type="Nueva solicitud"
        date="22 de Agosto 2022"
      />
      <DatosGenerales />
    </Layout>
  );
}

export default newRequest;
