import React, { useContext, useEffect, useState } from 'react';
import { Layout, ButtonsForm, Context } from '@siiges-ui/shared';
import {
  getInstitucionUsuario,
  NewInstitutionForm,
} from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';
import createInstitucion from '@siiges-ui/instituciones/src/utils/createInstitucion';
import { CircularProgress } from '@mui/material';

export default function NuevaInstitucion() {
  const { session, setNoti } = useContext(Context);
  const router = useRouter();
  const { institucion } = getInstitucionUsuario();
  const [institucionForm, setInstitucionForm] = useState({
    usuarioId: session.id,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (institucion) {
      router.push(`/institucion/${institucion.id}/consultarInstitucion`);
    } else {
      setIsLoading(false);
    }
  }, [institucion, router, isLoading]);

  const handleConfirm = () => {
    createInstitucion(institucionForm, errors, setNoti, router, session.token);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout title="Alta Institución">
      {isLoading ? (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px',
        }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <NewInstitutionForm
            form={institucionForm}
            setForm={setInstitucionForm}
            setErrors={setErrors}
          />
          <ButtonsForm confirm={handleConfirm} cancel={handleCancel} />
        </>
      )}
    </Layout>
  );
}
