import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { Institucion, Planteles } from '@siiges-ui/instituciones';
import {
  Box,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';

export default function InstitutionPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout title="Institucion">
      <Grid container>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Datos de institucion" />
            <Tab label="Planteles" />
          </Tabs>
        </Box>
        {value === 0 && <Institucion />}
        {value === 1 && <Planteles />}
      </Grid>
    </Layout>
  );
}
