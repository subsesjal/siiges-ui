import { ButtonsForm, Context, Layout } from '@siiges-ui/shared';
import {
  NewInstitutionForm,
} from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

export default function nuevaInstitucion() {
  const router = useRouter();
  const { session } = useContext(Context);
  // const institucion = getInstitucionUsuario();

  const institucion = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/instituciones/usuarios/${session.id}`);
    console.log(response);
  };
  useEffect(() => {
    institucion().then((res) => { console.log(res); });
  }, [session]);

  if (institucion.id !== undefined) {
    router.push(`/institucion/${institucion.id}/consultarInstitucion`);
  }

  return (
    <Layout title="Alta Institution">
      <NewInstitutionForm />
      <ButtonsForm />
    </Layout>
  );
}
