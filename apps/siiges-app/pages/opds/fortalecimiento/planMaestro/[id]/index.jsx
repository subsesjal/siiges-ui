import { Grid } from '@mui/material';
import { DataTable, Layout, Select } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import { columnsPlanMaestro } from '@siiges-ui/opds';
import { useRouter } from 'next/router';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
import { periodData, sessionData } from '@siiges-ui/opds/src/utils/constants';

export default function PlanMaestro() {
  const router = useRouter();
  const [periodo, setPeriodo] = useState('');
  const [session, setSession] = useState('');
  const [method, setMethod] = useState();
  const [auth, setAuth] = useState(true);
  const { id } = router.query;
  const [path, setPath] = useState();
  const [body, setBody] = useState();
  const { data } = useApi({
    endpoint: path || `api/v1/planMaestro/${id}`,
    method,
    dataBody: body,
  });
  const [proyectos, setProyectos] = useState();

  const createPlanMaestro = () => {
    setBody({
      institucionId: id,
      periodoId: periodo,
      sesionId: session,
      fecha: new Date().toISOString(),
    });
    setMethod('POST');
    setPath('api/v1/planMaestro/'); // En cuanto se cambia el state se ejecuta el useApi
  };
  useEffect(() => {
    if (!!session && !!periodo) {
      setAuth(false);
    } else setAuth(true);
  }, [session, periodo]);

  useEffect(() => {
    // Cuando el request es un array se guarda en el state para que no se modifique cuando
    // la data traiga un resultado no deseado
    if (Array.isArray(data)) {
      setProyectos(data);
    }
    // Cuando se realiza un create devuelve objeto, entonces hacemos un GET request
    if (Object.prototype.toString.call(data) === '[object Object]') {
      router.push({
        pathname: '/opds/fortalecimiento/planMaestro/crearPlanMaestro',
        query: { planMaestroId: data.id },
      });
    }
  }, [data]);
  return (
    <Layout title="Plan Maestro">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            title="Tipo de Periodo"
            name="tipoPeriodo"
            value={periodo}
            options={periodData}
            onChange={(event) => setPeriodo(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Tipo de Sesión"
            name="tipoSesion"
            value={session}
            options={sessionData}
            onChange={(event) => setSession(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            rows={proyectos || []}
            columns={columnsPlanMaestro}
            buttonAdd
            buttonText="Crear Nuevo Proyecto"
            buttonDisabled={auth}
            buttonClick={() => {
              createPlanMaestro();
            }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
