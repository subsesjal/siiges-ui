import React, { useContext, useState } from 'react';
import { ButtonsForm, Context, Layout } from '@siiges-ui/shared';
import { NewInstitutionForm } from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';
import createInstitucion from '@siiges-ui/instituciones/src/utils/createInstitucion';
import { Grid } from '@mui/material';

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NewInstitutionForm
            form={institucionForm}
            setForm={setInstitucionForm}
            setErrors={setErrors}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm confirm={handleConfirm} cancel={handleCancel} />
        </Grid>
      </Grid>
    </Layout>
  );
}
