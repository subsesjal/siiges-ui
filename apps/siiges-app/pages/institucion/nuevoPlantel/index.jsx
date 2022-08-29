import React from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import { NewPlantelForm } from '@siiges-ui/instituciones';

export default function NewPlantel() {
  return (
    <Layout title="Alta Plantel">
      <NewPlantelForm />
      <ButtonsForm />
    </Layout>
  );
}
