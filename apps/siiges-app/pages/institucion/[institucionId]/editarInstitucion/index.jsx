import React from 'react';
import { useRouter } from 'next/router';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import { EditInstitutionForm } from '@siiges-ui/instituciones';
import getInstitucion from '../../utils/getInstitucion';

export default function editarInstitucion() {
  const router = useRouter();
  const { institucion, loading } = getInstitucion();
  return (
    <Layout title="Editar Institución">
      {loading ? (
        <>
          <EditInstitutionForm data={institucion.data} />
          <ButtonsForm
            confirm={() => {}}
            cancel={() => {
              router.back();
            }}
          />
        </>
      ) : (
        <div />
      )}
    </Layout>
  );
}
