import { Grid } from '@mui/material';
import {
  DataTable, Layout, Select, ButtonsForm,
} from '@siiges-ui/shared';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { columnsAnteproyecto } from '@siiges-ui/opds';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
import { presupuestosData } from '@siiges-ui/opds/src/utils/constants';
import { filterRows } from '@siiges-ui/opds/src/utils/helpers';

export default function Anteproyecto() {
  const router = useRouter();
  const { data } = useApi({ endpoint: 'api/v1/presupuestos/presupuestoEgresos/3' });
  const [recursos, setRecursos] = useState(1);

  return (
    <Layout
      title="Presupuesto"
      subtitle="Resumen por Capítulo y Origen del Recurso de Acuerdo a lo Reportado en la Primera Sesión Ordinaria"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            title="Tipo de Recurso"
            name="tipoPeriodo"
            value={recursos}
            options={presupuestosData}
            onchange={(event) => setRecursos(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            columns={columnsAnteproyecto}
            rows={data ? filterRows(data, recursos) : []}
            title={`Cantidad total: ${
              data ? filterRows(data, 5).at(-1).cantidad : 0
            }`}
            // title="Anteproyecto de egresos 2024"
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            cancel={() => router.back()}
            confirm={() => router.back()}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
