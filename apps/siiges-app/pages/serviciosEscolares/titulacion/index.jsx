import { TitulosForm, TitulosTable } from '@siiges-ui/serviciosescolares';
import { useUI, Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

export default function Titulacion() {
  const { setLoading } = useUI();
  const [titulos, setTitulos] = useState([]);
  const [programa, setPrograma] = useState();
  const [reloadFlag, setReloadFlag] = useState(false);
  const [modo, setModo] = useState('general');

  const reloadTitulos = () => {
    setReloadFlag((prev) => !prev);
  };

  const toggleModo = () => {
    setModo((prev) => (prev === 'general' ? 'especifico' : 'general'));
  };

  return (
    <Layout title="Catálogo de Títulos Electrónicos">
      <TitulosForm
        setTitulos={setTitulos}
        setPrograma={setPrograma}
        setLoading={setLoading}
        reloadFlag={reloadFlag}
        modo={modo}
        toggleModo={toggleModo}
      />
      <Divider sx={{ marginTop: 2 }} />
      <TitulosTable
        titulos={titulos}
        programa={programa}
        reloadTitulos={reloadTitulos}
      />
    </Layout>
  );
}
