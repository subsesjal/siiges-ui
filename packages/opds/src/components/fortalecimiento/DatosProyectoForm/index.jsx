import {
  Checkbox, FormControlLabel, Grid, Typography,
} from '@mui/material';
import { DataTable, Input } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Columns from './Columns';
import rows from './Columns/MockRows';
import Modal from './Modal';

export default function DatosProyectoForm({ type }) {
  const [disabled] = useState(type === 'consultar');
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

  const handleChange = (event) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCrearEspacio = () => {
    setModalState({
      open: true,
      title: 'Crear Espacio de Proyecto',
      disabled: true,
      confirmAction: () => {},
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            name="nombre"
            label="Nombre"
            id="nombre"
            auto="nombre"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="montoAutorizado"
            label="Monto Autorizado"
            id="montoAutorizado"
            auto="montoAutorizado"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="montoContratado"
            label="Monto Contratado"
            id="montoContratado"
            auto="montoContratado"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="montoEjercido"
            label="Monto Ejercido"
            id="montoEjercido"
            auto="montoEjercido"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            name="acciones"
            label="Acciones"
            id="acciones"
            auto="acciones"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="porcentajeDeAvance"
            label="Porcentaje de Avance"
            id="porcentajeDeAvance"
            auto="porcentajeDeAvance"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaRealInicio"
            label="Fecha Real de Inicio"
            id="fechaRealInicio"
            auto="fechaRealInicio"
            disabled={disabled}
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaRealFin"
            label="Fecha Real de Fin"
            id="fechaRealFin"
            auto="fechaRealFin"
            disabled={disabled}
            type="date"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="observaciones"
            label="Observaciones"
            id="observaciones"
            auto="observaciones"
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
            label="Numero de Contrato"
            id="numeroDeContrato"
            auto="numeroDeContrato"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaInicio"
            label="Fecha de Inicio"
            id="fechaInicio"
            auto="fechaInicio"
            disabled={disabled}
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="fechaFin"
            label="Fecha de Fin"
            id="fechaFin"
            auto="fechaFin"
            disabled={disabled}
            type="date"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="contratista"
            label="Contratista"
            id="contratista"
            auto="contratista"
            disabled={disabled}
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
      </Grid>
      <Modal modalState={modalState} setModalState={setModalState} />
    </>
  );
}

DatosProyectoForm.propTypes = {
  type: PropTypes.string.isRequired,
};
