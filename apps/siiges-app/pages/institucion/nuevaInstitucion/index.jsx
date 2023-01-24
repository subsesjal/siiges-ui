import React, { useEffect } from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import {
  getInstitucionUsuario,
  NewInstitutionForm,
} from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';

export default function nuevaInstitucion() {
  const router = useRouter();
  const institucion = getInstitucionUsuario();

  useEffect(() => {
    if (institucion.institucion !== undefined) {
      router.push(`/institucion/${institucion.institucion.id}/consultarInstitucion`);
    }
  }, [institucion]);

  return (
    <Layout title="Alta Institution">
      <NewInstitutionForm />
      <ButtonsForm />
    </Layout>
  );
}
