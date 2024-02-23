import { Grid, TextField, Typography } from '@mui/material';
import {
  ButtonSimple, LabelData, Layout, Select, useApi,
} from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { filterRows } from '@siiges-ui/opds/src/utils/helpers';
import { useRouter } from 'next/router';
import { sessionData, periodData } from '@siiges-ui/opds/src/utils/constants';

export default function presupuesto() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const { id } = router.query;
  const [dataFilter, setDataFilter] = useState(null);
  const [periodo, setPeriodo] = useState();
  const [sesion, setSesion] = useState();
  const { data } = useApi({
    endpoint: `api/v1/presupuestos/instituciones/${id}`,
  });
  const anio = [
    { id: 1, nombre: 2022 },
    { id: 2, nombre: 2023 },
    { id: 3, nombre: 2024 },
    { id: 4, nombre: 2025 },
  ];

  useEffect(() => {
    setDataFilter(
      data?.filter(
        ({ periodoId, sesionId }) => periodoId === periodo && sesionId === sesion,
      ),
    );
  }, [sesion, periodo]);

  useEffect(() => {
    if (dataFilter?.length) {
      console.log(dataFilter[0].presupuesto || null);
      console.log(filterRows(setDataFilter[0]?.presupuesto, 1) || null);
    }
  }, [dataFilter]);

  const handleEgresos = () => {
    router.push(`/opds/presupuesto/${id}/egresos`);
  };

  const handleAnteproyecto = () => {
    router.push(`/opds/presupuesto/${id}/anteproyecto`);
  };

  return (
    <Layout title="Presupuesto">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Select
            title="Periodo"
            options={periodData}
            value={periodo}
            onchange={(event) => setPeriodo(event.target.value || '')}
            name="periodo"
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Sesión"
            options={sessionData}
            name="sesion"
            value={sesion}
            onchange={(event) => setSesion(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Año" options={anio} name="ano" value={3} />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Convenio
            {year}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Estatal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Federal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Total" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="observacionesConvenio"
            label="Observaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Presupuestos
            {' '}
            {year}
            {' '}
            Autorizados por las juntas directivas durante la
            primera sesión ordinaria del año
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Estatal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Federal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Total" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="observacionesPresupuesto"
            label="Observaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple
            text={`Anteproyecto de egresos ${year}`}
            onClick={handleAnteproyecto}
            align="right"
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple
            text={`Presupuesto de egresos ${year}`}
            onClick={handleEgresos}
          />
        </Grid>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <ButtonUnstyled
              className="buttonAdd cancel"
              onClick={() => router.back()}
            >
              Cancelar
            </ButtonUnstyled>
          </Grid>
          <Grid item>
            <ButtonUnstyled className="buttonAdd guardar">
              Guardar
            </ButtonUnstyled>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
