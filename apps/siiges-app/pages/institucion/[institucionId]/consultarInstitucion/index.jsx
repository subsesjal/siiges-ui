import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { Institucion, Planteles, getInstitucion } from '@siiges-ui/instituciones';
import {
  Box, Grid, Tab, Tabs,
} from '@mui/material';

export default function ConsultarInstitucion() {
  const { institucion, loading } = getInstitucion();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Institución">
      {loading ? (
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Datos de institución" />
                <Tab label="Planteles" />
              </Tabs>
            </Box>
          </Grid>
          {value === 0 && <Institucion data={institucion.data} />}
          {value === 1 && (
            <Planteles
              institucion={institucion.data.id}
              data={institucion.data.planteles}
            />
          )}
        </Grid>
      ) : null}
    </Layout>
  );
}
