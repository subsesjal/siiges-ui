import { Grid } from '@mui/material';
import {
  DataTable, Layout, Select, ButtonsForm,
} from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { columnsAnteproyecto } from '@siiges-ui/opds';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
import { presupuestosData } from '@siiges-ui/opds/src/utils/constants';
import { filterRows } from '@siiges-ui/opds/src/utils/helpers';
import Modal from '@siiges-ui/opds/src/components/presupuesto/modal';

export default function Anteproyecto() {
  const router = useRouter();
  const { id } = router.query;
  const [recursos, setRecursos] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [createRow, SetCreateRow] = useState(false);
  const [rowsData, setRowsData] = useState({});
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState(null);
  const [reload, setReload] = useState(false);

  const { data } = useApi({
    endpoint: `api/v1/presupuestos/presupuestoEgresos/${id}`,
    method,
    dataBody: body,
    reload,
  });

  const handleCrearEspacio = () => {
    setModalState({
      open: true,
      title: 'Crear Espacio de Proyecto',
      disabled: true,
      confirmAction: () => {},
    });
  };

  useEffect(() => {
    if (createRow) {
      setMethod('PATCH');
      setBody([rowsData]);
      setReload(!reload);
      SetCreateRow(false);
    }
  }, [createRow]);

  useEffect(() => {
    if (method === 'PATCH') {
      setMethod('GET');
      setBody(null);
      setReload(!reload);
    }
  }, [data]);

  return (
    <>
      <Layout
        title="Anteproyecto"
        subtitle="Resumen por Capítulo y Origen del Recurso"
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
              buttonAdd
              buttonText="Agregar datos de presupuesto"
              columns={columnsAnteproyecto}
              buttonClick={handleCrearEspacio}
              rows={data ? filterRows(data, recursos) : []}
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
