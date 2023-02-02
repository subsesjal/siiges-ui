import React from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import { NewPlantelForm } from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';

export default function NewPlantel() {
  const router = useRouter();
  return (
    <Layout title="Alta Plantel">
      <NewPlantelForm />
      <ButtonsForm cancel={router.back} confirm={() => {}} />
    </Layout>
  );
}
