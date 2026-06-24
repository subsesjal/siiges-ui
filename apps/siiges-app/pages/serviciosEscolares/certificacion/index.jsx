import { CertificadosForm, CertificadosTable } from '@siiges-ui/serviciosescolares';
import { useUI, Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

export default function Certificacion() {
  const { setLoading } = useUI();
  const [certificados, setCertificados] = useState();
  const [programa, setPrograma] = useState();

  return (
    <Layout title="Catálogo de Certificados Electrónicos">
      <CertificadosForm
        setCertificados={setCertificados}
        setPrograma={setPrograma}
        setLoading={setLoading}
      />
      <Divider sx={{ marginTop: 2 }} />
      {certificados && (
        <CertificadosTable
          certificados={certificados}
          programa={programa}
        />
      )}
    </Layout>
  );
}
