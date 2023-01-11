import React from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import { EditPlantelForm } from '@siiges-ui/instituciones';
import getPlantel from '../../utils/getPlantel';

export default function EditarPlantel() {
  const { plantel, loading } = getPlantel();
  return (
    <Layout title="Editar Plantel">
      {loading ? (
        <>
          <EditPlantelForm plantel={plantel.data} />
          <ButtonsForm />
        </>
      ) : (
        <div />
      )}
    </Layout>
  );
}
