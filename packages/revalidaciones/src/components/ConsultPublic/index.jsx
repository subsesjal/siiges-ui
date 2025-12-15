import { Grid } from '@mui/material';
import { InputSearch } from '@siiges-ui/shared';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function ConsultPublic() {
  const router = useRouter();
  const [folio, setFolio] = useState('');

  const handleSearch = () => {
    if (!folio || folio.trim().length < 4) return;

    router.push(`/consultaRevEquiv/${folio}/consultarFolio`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <InputSearch
          id="folio"
          label="Folio de la solicitud"
          name="folio"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
          onClickButton={handleSearch}
        />
      </Grid>
    </Grid>
  );
}
