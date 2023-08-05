import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ButtonsForm, Layout, Context, SnackAlert } from '@siiges-ui/shared';
import { EditInstitutionForm } from '@siiges-ui/instituciones';
import getInstitucion from '../../utils/getInstitucion';
import updateInstitucion from '../../utils/updateInstitucion';

export default function editarInstitucion() {
  const { session } = useContext(Context);
  const router = useRouter();
  const { institucion, loading } = getInstitucion();
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [institucionForm, setInstitucionForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleConfirm = () => {
    updateInstitucion(institucionForm, errors, setNoti, router);
  };

  const handleClose = () => {
    setNoti({ ...noti, open: false });
  };

  return (
    <Layout title="Editar Institución">
      {loading ?
       (
        <>
          <EditInstitutionForm
            data={institucion.data}
            form={institucionForm}
            setForm={setInstitucionForm}
            setErrors={setErrors}
          />
          <ButtonsForm
            confirm={handleConfirm}
            cancel={() => {
              router.back();
            }}
          />
          <SnackAlert
            open={noti.open}
            close={handleClose}
            type={noti.type}
            mensaje={noti.message}
          />
        </>
      ) : (
        <div />
      )}
    </Layout>
  );
}
