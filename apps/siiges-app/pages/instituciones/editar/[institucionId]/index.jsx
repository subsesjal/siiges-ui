import React, { useContext, useState } from 'react';
import { Context, Layout, ButtonsForm } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import { EditInstitutionForm, getInstitucionHook } from '@siiges-ui/instituciones';
import updateInstitucion from '@siiges-ui/instituciones/src/utils/updateInstitucion';

export default function editarInstitucion() {
  const router = useRouter();
  const { session, setLoading, setNoti } = useContext(Context);
  const [institucionForm, setInstitucionForm] = useState({});
  const [errors, setErrors] = useState({});
  const [institucion, setInstitucion] = useState(null);

  getInstitucionHook({
    setInstitucion, session, setLoading, setNoti,
  });

  const handleConfirm = () => {
    updateInstitucion(institucionForm, errors, setNoti, router);
  };

  console.log(institucion);

  return (
    <Layout title="Modificar Institución">
      <>
        <EditInstitutionForm
          data={institucion}
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
      </>
    </Layout>
  );
}
