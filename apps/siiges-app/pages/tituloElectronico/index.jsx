import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { ButtonSimple, Input, Layout } from '@siiges-ui/shared';

export default function TituloElectronico() {
  const [folio, setFolio] = useState('');
  const router = useRouter();

  const handleOnChange = (event) => {
    setFolio(event.target.value);
  };

  const handleSubmit = () => {
    if (folio.trim()) {
      router.push(`/tituloElectronico/${folio}/consultarFolio`);
    }
  };

  return (
    <Layout title="Consulta tu Constancia de Título">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Input
            label="Ingresa tu folio"
            name="folio"
            id="folio"
            value={folio}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonSimple align="right" text="Consultar" onClick={handleSubmit} />
        </Grid>
      </Grid>
    </Layout>
  );
}
