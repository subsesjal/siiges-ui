import React, { useContext, useState } from 'react';
import { ButtonsForm, Context, Layout } from '@siiges-ui/shared';
import { NewInstitutionForm } from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';
import createInstitucion from '@siiges-ui/instituciones/src/utils/createInstitucion';

export default function NuevaInstitucion() {
  const { session, setNoti } = useContext(Context);
  const router = useRouter();
  const [institucionForm, setInstitucionForm] = useState({
    usuarioId: session.id,
  });
  const [errors, setErrors] = useState({});

  const handleConfirm = () => {
    createInstitucion(institucionForm, errors, setNoti, router);
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
      <ButtonsForm confirm={handleConfirm} cancel={handleCancel} />
    </Layout>
  );
}
