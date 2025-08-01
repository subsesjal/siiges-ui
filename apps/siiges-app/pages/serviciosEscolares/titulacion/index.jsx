import { TitulosForm, TitulosTable } from '@siiges-ui/serviciosescolares';
import { Context, Layout } from '@siiges-ui/shared';
import { Divider } from '@mui/material';
import React, { useState, useContext } from 'react';

export default function Titulacion() {
  const { setLoading } = useContext(Context);
  const [titulos, setTitulos] = useState();
  const [programa, setPrograma] = useState();
  const [reloadFlag, setReloadFlag] = useState(false);

  const reloadTitulos = () => {
    setReloadFlag((prev) => !prev);
  };

  return (
    <Layout title="Catálogo de Títulos Electrónicos">
      <TitulosForm
        setTitulos={setTitulos}
        setPrograma={setPrograma}
        setLoading={setLoading}
        reloadFlag={reloadFlag}
      />
      <Divider sx={{ marginTop: 2 }} />
      {titulos && (
        <TitulosTable
          titulos={titulos}
          programa={programa}
          reloadTitulos={reloadTitulos}
        />
      )}
    </Layout>
  );
}
