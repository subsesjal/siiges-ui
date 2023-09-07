import React, { useContext, useEffect, useState } from 'react';
import {
  ButtonsForm, Context, Layout,
} from '@siiges-ui/shared';
import { getInstitucionUsuario, NewInstitutionForm } from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';
import createInstitucion from '@siiges-ui/instituciones/src/utils/createInstitucion';

export default function NuevaInstitucion() {
  const { session, setNoti } = useContext(Context);
  const router = useRouter();
  const data = getInstitucionUsuario();
  const [institucionForm, setInstitucionForm] = useState({ usuarioId: session.id });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data.institucion !== undefined && data.institucion !== null) {
      router.push(`/institucion/${data.institucion.id}/consultarInstitucion`);
    }
  }, [data, router]);

  const handleConfirm = () => {
    createInstitucion(institucionForm, errors, setNoti, router, session.token);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout title="Alta Institución">
      <NewInstitutionForm
        form={institucionForm}
        setForm={setInstitucionForm}
        setErrors={setErrors}
      />
      <ButtonsForm
        confirm={handleConfirm}
        cancel={handleCancel}
      />
    </Layout>
  );
}
