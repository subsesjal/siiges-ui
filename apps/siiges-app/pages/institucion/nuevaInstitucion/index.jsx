import React, { useEffect } from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import {
  getInstitucionUsuario,
  NewInstitutionForm,
} from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';

export default function nuevaInstitucion() {
  const router = useRouter();
  const data = getInstitucionUsuario();

  useEffect(() => {
    if (data.institucion !== undefined) {
      router.push(`/institucion/${data.institucion.id}/consultarInstitucion`);
    }
  }, [data]);

  return (
    <Layout title="Alta Institution">
      <NewInstitutionForm />
      <ButtonsForm />
    </Layout>
  );
}
