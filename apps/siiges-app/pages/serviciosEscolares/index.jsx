import React, { useState } from 'react';
import { Layout, DataTable } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import { getInstituciones } from '@siiges-ui/instituciones';
import columns from '@siiges-ui/serviciosescolares/src/Tables/institucionesAutorizadas';

export default function serviciosEscolares() {
  const [loading, setLoading] = useState(true);

  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    setLoading,
    tipoInstitucionId: 1,
  });
  let rows = {};

  if (instituciones !== undefined) {
    rows = instituciones;
  }

  return (
    <Layout
      title="Instituciones"
      subtitle="Consulta todas las instituciones registradas"
      loading={loading}
    >
      <Grid container>
        {loading && (
          <DataTable
            rows={rows}
            columns={columns}
            title="Tabla de instituciones"
          />
        )}
      </Grid>
    </Layout>
  );
}
