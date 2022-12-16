import React from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import { EditPlantelForm } from '@siiges-ui/instituciones';
import getInstitucion from '../../utils/getInstitucion';

export default function EditarPlantel() {
  const { institucion, loading } = getInstitucion();
  console.log(institucion);
  return (
    <Layout title="Editar Plantel">
      {loading ? (
        <>
          <EditPlantelForm />
          <ButtonsForm />
        </>
      ) : (
        <div />
      )}
    </Layout>
  );
}
