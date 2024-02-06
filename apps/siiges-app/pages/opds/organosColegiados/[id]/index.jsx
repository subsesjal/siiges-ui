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
  const [path, setPath] = useState();
  const [body, setBody] = useState();
  const array = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));
  const { data } = useApi({
    endpoint: path || `api/v1/orgColegiados/instituciones/${id}`,
    method,
    dataBody: body,
  });
  const [instituciones, setInstituciones] = useState();

  const createPlanMaestro = () => {
    setBody({
      institucionId: id,
      periodoId: periodo,
      sesionId: session,
      fecha: new Date().toISOString().split('T')[0],
    });
    setMethod('POST');
    setPath('api/v1/orgColegiados/'); // En cuanto se cambia el state se ejecuta el useApi
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
      setInstituciones(data);
    }
    // Cuando se realiza un create devuelve objeto, entonces hacemos un GET request
    if (Object.prototype.toString.call(data) === '[object Object]') {
      setBody(null);
      setMethod('GET');
      setPath(`api/v1/orgColegiados/instituciones/${id}`);
    }
  }, [data]);

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
            rows={instituciones || array}
            columns={columnsOrganosColegiados}
            buttonAdd
            buttonDisabled={auth}
            buttonText="Crear Nueva Sesión"
            buttonClick={() => {
              createPlanMaestro();
            }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
