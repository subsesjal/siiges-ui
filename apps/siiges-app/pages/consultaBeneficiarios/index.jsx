import { ConsultBeneficiariosBecas } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function ConsultaBeneficiarios() {
  return (
    <Layout title="Consulta Beneficiarios de Becas">
      <ConsultBeneficiariosBecas />
    </Layout>
  );
}
