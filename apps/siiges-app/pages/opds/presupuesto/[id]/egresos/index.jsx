import { Grid } from '@mui/material';
import {
  DataTable, Layout, Select, ButtonsForm, useApi,
} from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { columnsAnteproyecto } from '@siiges-ui/opds';
import { presupuestosData } from '@siiges-ui/opds/src/utils/constants';
import { filterRows } from '@siiges-ui/opds/src/utils/helpers';
import Modal from '@siiges-ui/opds/src/components/presupuesto/modal';

export default function Egresos() {
  const router = useRouter();
  const { id } = router.query;
  const [recursos, setRecursos] = useState(1);
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    disabled: false,
    edit: true,
    confirmAction: () => {},
  });
  const [createRow, SetCreateRow] = useState(false);
  const [rowsData, setRowsData] = useState({});
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState(null);
  const [reload, setReload] = useState(false);
  const columns = columnsAnteproyecto({ setRowsData, SetCreateRow });

  const { data } = useApi({
    endpoint: `api/v1/presupuestos/presupuestoEgresos/${id}`,
    method,
    dataBody: body,
    reload,
  });

  const handleCrearEspacio = () => {
    setModalState({
      open: true,
      title: 'Crear Egreso',
      disabled: true,
      confirmAction: () => {},
    });
  };

  useEffect(() => {
    if (createRow) {
      setMethod('PATCH');
      setBody([rowsData]);
      setReload((previousReload) => !previousReload);
      SetCreateRow(false);
    }
  }, [createRow, rowsData]);

  useEffect(() => {
    if (method === 'PATCH') {
      setMethod('GET');
      setBody(null);
      setReload((previousReload) => !previousReload);
    }
  }, [data, method]);

  return (
    <>
      <Layout
        title="Egresos"
        subtitle="Resumen por Capítulo y Origen del Recurso"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              title="Tipo de Recurso"
              name="tipoPeriodo"
              value={recursos}
              options={presupuestosData}
              onChange={(event) => setRecursos(event.target.value || '')}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              buttonAdd
              buttonText="Agregar datos de presupuesto"
              columns={columns}
              buttonClick={handleCrearEspacio}
              rows={data ? filterRows(data, recursos, 2) : []}
              title="Presupuesto"
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
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        setRowsData={setRowsData}
        SetCreateRow={SetCreateRow}
        tipoEgresoId={2}
      />
    </>
  );
}
