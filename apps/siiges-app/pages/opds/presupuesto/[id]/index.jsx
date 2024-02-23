import { Grid, TextField, Typography } from '@mui/material';
import {
  ButtonSimple, Input, LabelData, Layout, Select, useApi,
} from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { useRouter } from 'next/router';
import { sessionData, periodData } from '@siiges-ui/opds/src/utils/constants';

export default function presupuesto() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const { id } = router.query;
  const [presupuestoId, setPresupuestoId] = useState();
  const [dataFilter, setDataFilter] = useState(null);
  const [periodo, setPeriodo] = useState();
  const [sesion, setSesion] = useState();
  const [fecha, setFecha] = useState(3);
  const [enableText, setEnableText] = useState(true);
  const [form, setForm] = useState({});

  // API parameters state
  const [path, setPath] = useState();
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState(null);
  const { data } = useApi({
    endpoint: path || `api/v1/presupuestos/instituciones/${id}`,
    method,
    dataBody: body,
  });

  // Constants
  const anio = [
    { id: 1, nombre: 2022 },
    { id: 2, nombre: 2023 },
    { id: 3, nombre: 2024 },
    { id: 4, nombre: 2025 },
  ];

  // Functions
  const updateForm = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const getYear = (yearParam) => anio.find(({ id: idYear }) => idYear === yearParam).nombre;

  const dateFormat = (yearParam) => new Date(getYear(yearParam), 0);

  const getFullYear = (yearParam) => new Date(yearParam).getFullYear();

  const createPresupuesto = () => {
    const { cantidadEstatal, cantidadFederal, observacion } = form;
    setMethod('POST');
    setBody({
      institucionId: id,
      periodoId: periodo,
      sesionId: sesion,
      fecha: dateFormat(fecha),
      cantidadEstatal,
      cantidadFederal,
      observacion,
    });
    setPath('api/v1/presupuestos/');
  };

  // Handlers
  const handleEgresos = () => {
    router.push(`/opds/presupuesto/${presupuestoId}/egresos`);
  };

  const handleAnteproyecto = () => {
    router.push(`/opds/presupuesto/${presupuestoId}/anteproyecto`);
  };

  // Use Effect and data controller
  useEffect(() => {
    if (Array.isArray(data)) {
      setForm({});
      setDataFilter(
        data?.filter(
          ({ periodoId, sesionId, fecha: dateFecha }) => periodoId === periodo
            && sesionId === sesion
            && getFullYear(dateFecha) === getYear(fecha),
        )[0],
      );
    }
  }, [sesion, periodo, fecha, data]);

  useEffect(() => {
    if (method === 'POST') {
      setMethod('GET');
      setBody(null);
      setForm({});
      setPath(`api/v1/presupuestos/instituciones/${id}`);
    }
  }, [data]);

  useEffect(() => {
    if (dataFilter) {
      setPresupuestoId(dataFilter.id);
      setEnableText(false);
    }
    if (!dataFilter) {
      setEnableText(true);
    }
  }, [dataFilter]);

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
          <Select
            title="Año"
            options={anio}
            name="ano"
            value={fecha}
            onchange={(event) => setFecha(event.target.value || '')}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {periodo && sesion
              ? `Presupuestos
            ${getYear(fecha)}
            Autorizados por las juntas directivas durante el
            ${periodData.at(periodo - 1).descripcion} de la sesión ${
                sessionData.at(sesion - 1).nombre
              } del año`
              : `Presupuestos
            ${year}
            Autorizados por las juntas directivas.`}
          </Typography>
        </Grid>
        {!enableText && (
          <>
            <Grid item xs={4}>
              <LabelData
                title="Estatal"
                subtitle={`$ ${dataFilter?.cantidadEstatal}`}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelData
                title="Federal"
                subtitle={`$ ${dataFilter?.cantidadFederal}`}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelData title="Total" subtitle={`$ ${dataFilter?.total}`} />
            </Grid>
          </>
        )}
        {enableText && (
          <>
            <Grid item xs={4}>
              <Input
                name="cantidadEstatal"
                value={form.cantidadEstatal}
                label="Estatal"
                id="cantidadEstatal"
                auto="cantidadEstatal"
                onchange={(e) => updateForm(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                name="cantidadFederal"
                value={form.cantidadFederal}
                label="Federal"
                id="cantidadFederal"
                auto="cantidadFederal"
                onchange={(e) => updateForm(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                name="total"
                value={form.total}
                label="Total"
                id="total"
                auto="total"
                onchange={(e) => updateForm(e.target.name, e.target.value)}
                disabled
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TextField
            id="observacion"
            name="observacion"
            label="Observaciones"
            value={form?.observacion || dataFilter?.observacion || ''}
            rows={4}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            multiline
            focused={dataFilter?.observacion}
            sx={{ width: '100%' }}
          />
        </Grid>
        {!enableText && (
          <>
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
          </>
        )}
        <Grid container justifyContent="flex-end" spacing={2} marginTop={1}>
          <Grid item>
            <ButtonUnstyled
              className="buttonAdd cancel"
              onClick={() => router.back()}
            >
              Cancelar
            </ButtonUnstyled>
          </Grid>
          <Grid item>
            <ButtonUnstyled
              className="buttonAdd guardar"
              onClick={() => enableText && createPresupuesto()}
            >
              Guardar
            </ButtonUnstyled>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
