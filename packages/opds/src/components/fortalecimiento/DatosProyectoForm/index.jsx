import {
  Checkbox, FormControlLabel, Grid, Typography,
} from '@mui/material';
import { DataTable, Input, ButtonsForm } from '@siiges-ui/shared';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Columns from './Columns';
import rowsTipoProyectos from './Columns/MockRows';
import Modal from './Modal';

export default function DatosProyectoForm({ type }) {
  const router = useRouter();
  const { id, planMaestroId } = router.query;
  const [rows, setRows] = useState([]);
  const [disabled] = useState(type === 'consultar');
  const [form, setForm] = useState({});
  const [rowsData, setRowsData] = useState({});
  const [body, setBody] = useState(null);
  const [proyectoTipoProyecto, setTipoProyecto] = useState([]);
  const [method, setMethod] = useState('GET');
  const [reload, setReload] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    obraNueva: false,
    obraDeContinuidad: false,
    equipamiento: false,
    adecuaciones: false,
    mantenimiento: false,
    proyectoSustentable: false,
  });
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    disabled: false,
    edit: true,
    confirmAction: () => {},
  });

  const { data } = useApi({
    endpoint: `api/v1/planMaestro/datosDelProyecto/${planMaestroId || id}`,
    dataBody: body,
    method,
    reload,
  });

  useEffect(() => {
    if (Array.isArray(data) && type !== 'crear') {
      const datosfilter = data?.find((row) => row.id === Number(id));
      setRows(datosfilter.proyectoEspacio || []);
      setForm({
        montoAutorizado: datosfilter.montoAutorizado,
        montoContratado: datosfilter.montoContratado,
        nombre: datosfilter.nombre,
        montoEjercido: datosfilter.montoEjercido,
        acciones: datosfilter.acciones,
        porcentajeDeAvance: datosfilter.porcentajeDeAvance,
        fechaRealInicio: new Date(datosfilter.fechaRealInicio)
          .toISOString()
          .split('T')[0],
        fechaRealFin: new Date(datosfilter.fechaRealFin)
          .toISOString()
          .split('T')[0],
        obeservaciones: datosfilter.obeservaciones,
        numeroDeContrato: datosfilter.contrato.numeroDeContrato,
        fechaInicio: new Date(datosfilter.contrato.fechaInicio)
          .toISOString()
          .split('T')[0],
        fechaFin: new Date(datosfilter.contrato.fechaFin)
          .toISOString()
          .split('T')[0],
        contratista: datosfilter.contrato.contratista,
      });
      const datosDelProyecto = datosfilter.proyectoTipoProyecto.map((checkbox) => ({
        [checkbox.tipoProyecto.nombre]: true,
      }));
      const mergedObject = datosDelProyecto.reduce((acc, obj) => ({ ...acc, ...obj }), {});
      setCheckboxState({
        ...checkboxState,
        ...mergedObject,
      });
    }
    if (Object.prototype.toString.call(data) === '[object Object]') {
      router.back();
    }
  }, [data]);

  const createDatos = () => {
    setBody({
      montoAutorizado: form.montoAutorizado,
      montoContratado: form.montoContratado,
      nombre: form.nombre,
      montoEjercido: form.montoEjercido,
      acciones: form.acciones,
      porcentajeDeAvance: form.porcentajeDeAvance,
      fechaRealInicio: new Date(form.fechaRealInicio).toISOString(),
      fechaRealFin: new Date(form.fechaRealFin).toISOString(),
      obeservaciones: form.obeservaciones,
      contrato: {
        numeroDeContrato: form.numeroDeContrato,
        fechaInicio: new Date(form.fechaInicio).toISOString(),
        fechaFin: new Date(form.fechaFin).toISOString(),
        contratista: form.contratista,
      },
      proyectoTipoProyecto,
      proyectoEspacio: rows.map(({ id: _, ...rest }) => rest),
    });
    setMethod('POST');
    setReload(!reload);
  };

  const handleChange = (event) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
    setTipoProyecto([
      ...proyectoTipoProyecto,
      {
        tipoProyectoId: rowsTipoProyectos.find(
          (row) => row.nombre === event.target.name,
        ).id,
      },
    ]);
  };

  const updateForm = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleCrearEspacio = () => {
    setModalState({
      open: true,
      title: 'Crear Espacio de Proyecto',
      disabled: true,
      confirmAction: () => {},
    });
  };

  useEffect(() => {
    if (Object.keys(rowsData)?.length > 0) {
      const idRow = rows.length + 1;
      setRows((prevRows) => [...prevRows, { id: idRow, ...rowsData }]);
      setRowsData({});
    }
  }, [rowsData]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            name="nombre"
            value={form.nombre}
            label="Nombre"
            id="nombre"
            auto="nombre"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="montoAutorizado"
            value={form.montoAutorizado}
            label="Monto Autorizado"
            id="montoAutorizado"
            auto="montoAutorizado"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="montoContratado"
            value={form.montoContratado}
            label="Monto Contratado"
            id="montoContratado"
            auto="montoContratado"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="montoEjercido"
            value={form.montoEjercido}
            label="Monto Ejercido"
            id="montoEjercido"
            auto="montoEjercido"
            disabled={disabled}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            name="acciones"
            value={form.acciones}
            label="Acciones"
            id="acciones"
            auto="acciones"
            disabled={disabled}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="porcentajeDeAvance"
            value={form.porcentajeDeAvance}
            label="Porcentaje de Avance"
            id="porcentajeDeAvance"
            auto="porcentajeDeAvance"
            disabled={disabled}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaRealInicio"
            value={form.fechaRealInicio}
            label="Fecha Real de Inicio"
            id="fechaRealInicio"
            auto="fechaRealInicio"
            disabled={disabled}
            type="date"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaRealFin"
            value={form.fechaRealFin}
            label="Fecha Real de Fin"
            id="fechaRealFin"
            auto="fechaRealFin"
            disabled={disabled}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            type="date"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="obeservaciones"
            value={form.obeservaciones}
            label="Observaciones"
            id="observaciones"
            auto="observaciones"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            multiline
            maxRows={4}
            rows={4}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Contrato</Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            name="numeroDeContrato"
            value={form.numeroDeContrato}
            label="Número de Contrato"
            id="numeroDeContrato"
            auto="numeroDeContrato"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaInicio"
            value={form.fechaInicio}
            label="Fecha de Inicio"
            id="fechaInicio"
            auto="fechaInicio"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            disabled={disabled}
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaFin"
            value={form.fechaFin}
            label="Fecha de Fin"
            id="fechaFin"
            auto="fechaFin"
            disabled={disabled}
            type="date"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="contratista"
            value={form.contratista}
            label="Contratista"
            id="contratista"
            auto="contratista"
            disabled={disabled}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Tipo de Proyecto</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkboxState.obraNueva}
                onChange={handleChange}
                name="obraNueva"
                value={form.obraNueva}
                color="primary"
                disabled={disabled}
              />
            )}
            label="Obra Nueva"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkboxState.obraDeContinuidad}
                onChange={handleChange}
                name="obraDeContinuidad"
                color="primary"
                disabled={disabled}
              />
            )}
            label="Obra de Continuidad"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkboxState.equipamiento}
                onChange={handleChange}
                name="equipamiento"
                color="primary"
                disabled={disabled}
              />
            )}
            label="Equipamiento"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkboxState.adecuaciones}
                onChange={handleChange}
                name="adecuaciones"
                color="primary"
                disabled={disabled}
              />
            )}
            label="Adecuaciones"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkboxState.mantenimiento}
                onChange={handleChange}
                name="mantenimiento"
                color="primary"
                disabled={disabled}
              />
            )}
            label="Mantenimiento"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkboxState.proyectoSustentable}
                onChange={handleChange}
                name="proyectoSustentable"
                color="primary"
                disabled={disabled}
              />
            )}
            label="Proyecto Sustentable"
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            buttonAdd
            buttonText="Añadir Espacio de Proyecto"
            buttonClick={handleCrearEspacio}
            rows={rows}
            columns={Columns}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            cancel={() => router.back()}
            confirm={() => (type === 'crear' ? createDatos() : router.back())}
          />
        </Grid>
      </Grid>
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        setRowsData={setRowsData}
      />
    </>
  );
}

DatosProyectoForm.propTypes = {
  type: PropTypes.string.isRequired,
};
