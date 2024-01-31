import { DataTable, Layout, Select } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import { columnsOrganosColegiados } from '@siiges-ui/opds';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
import { periodData, sessionData } from '@siiges-ui/opds/src/utils/constants';

export default function organosColegiados() {
  const router = useRouter();
  const [periodo, setPeriodo] = useState('');
  const [session, setSession] = useState('');
  const [method, setMethod] = useState();
  const [auth, setAuth] = useState(true);
  const { id } = router.query;
  const [reloadData, setReloadData] = useState(false);
  const [path, setPath] = useState();
  const [body, setBody] = useState();
  const { data } = useApi({
    endpoint: path || `api/v1/orgColegiados/instituciones/${id}`,
    method,
    reload: reloadData,
    dataBody: body,
  });

  const createPlanMaestro = () => {
    setBody({
      institucionId: id,
      periodoId: periodo,
      sesionId: session,
      fecha: new Date().toISOString(),
    });
    setMethod('POST');
    setPath('api/v1/planMaestro/');
    setReloadData(true);
  };

  useEffect(() => {
    if (!!session && !!periodo) {
      setAuth(false);
    } else setAuth(true);
  }, [session, periodo]);

  useEffect(() => {
    if (reloadData) {
      setBody(null);
      setMethod('GET');
      setPath(`api/v1/orgColegiados/instituciones/${id}`);
      setReloadData(false);
    }
  }, [reloadData]);

  return (
    <Layout title="Organos Colegiados">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            title="Tipo de Periodo"
            name="tipoPeriodo"
            value={periodo}
            options={periodData}
            onchange={(event) => setPeriodo(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Tipo de Sesion"
            name="tipoSesion"
            value={session}
            options={sessionData}
            onchange={(event) => setSession(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            rows={data || []}
            columns={columnsOrganosColegiados}
            buttonAdd
            buttonDisabled={auth}
            buttonText="Crear Nueva Sesión"
            buttonClick={() => {
              createPlanMaestro();
            }}
            // buttonClick={() => {
            //   router.push('/opds/organosColegiados/nuevaSesion');
            // }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
