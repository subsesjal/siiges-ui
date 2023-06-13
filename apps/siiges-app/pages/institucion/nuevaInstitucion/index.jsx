import React, { useContext, useEffect, useState } from 'react';
import {
  ButtonsForm, Context, Layout, SnackAlert,
} from '@siiges-ui/shared';
import { getInstitucionUsuario, NewInstitutionForm } from '@siiges-ui/instituciones';
import { useRouter } from 'next/router';
import createInstitucion from '../utils/createInstitucion';

export default function NuevaInstitucion() {
  const { session } = useContext(Context);
  const router = useRouter();
  const data = getInstitucionUsuario();
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [institucionForm, setInstitucionForm] = useState({ usuarioId: session.id });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data.institucion !== undefined && data.institucion !== null) {
      router.push(`/institucion/${data.institucion.id}/consultarInstitucion`);
    }
  }, [data, router]);

  const handleConfirm = () => {
    createInstitucion(institucionForm, errors, setNoti, router);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleClose = () => {
    setNoti({ ...noti, open: false });
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
      <SnackAlert
        open={noti.open}
        close={handleClose}
        type={noti.type}
        mensaje={noti.message}
      />
    </Layout>
  );
}
