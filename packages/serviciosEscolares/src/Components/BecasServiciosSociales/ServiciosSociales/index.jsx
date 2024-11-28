import { Grid } from '@mui/material';
import React, { useState } from 'react';
import BecasForm from '../Becas/utils/BecasForm';
import BecasTable from '../Becas/utils/BecasTable';

export default function ServicioSocial() {
  const [becas, setBecas] = useState();
  const [institucion, setInstitucion] = useState();
  return (
    <Grid container>
      <Grid item xs={12}>
        <BecasForm setBecas={setBecas} setInstitucion={setInstitucion} type="servicioSocial" />
      </Grid>
      {becas.length > 0 && (
      <Grid item xs={12}>
        <BecasTable becas={becas} institucion={institucion} />
      </Grid>
      )}
    </Grid>
  );
}
