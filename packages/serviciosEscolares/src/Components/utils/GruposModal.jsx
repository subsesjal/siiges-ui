import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  DefaultModal,
  Input,
  LabelData,
  Select,
} from '@siiges-ui/shared';
import grupoService from './gruposService';

const turnos = [{ id: 1, nombre: 'Matutino' }, { id: 2, nombre: 'Vespertino' }, { id: 3, nombre: 'Nocturno' }, { id: 4, nombre: 'Mixto' }];
export default function GruposModal({
  open, setOpen, type, data, params,
}) {
  const title = type === 'new' ? 'Agregar Grupo' : 'Editar Grupo';
  const [form, setForm] = useState();
  const pathGrupo = async (dataform) => {
    const dataBody = { ...dataform, ...params };
    if (data?.id) {
      grupoService({ id: data.id, dataBody });
    } else {
      grupoService({ dataBody });
    }
    setOpen(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <LabelData title="ID" subtitle={data?.id} />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Ciclo Escolar ID" subtitle={params?.gradoId} />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Grado" subtitle={params?.gradoNombre} />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Input
            id="descripcion"
            label="Descripcion"
            name="descripcion"
            auto="descripcion"
            onchange={handleOnChange}
            value={data?.descripcion}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Turno"
            value={data?.turnoId}
            options={turnos}
            onchange={handleOnChange}
            id="turnoId"
            name="turnoId"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="generacion"
            label="Generación"
            name="generacion"
            auto="generacion"
            onchange={handleOnChange}
            value={data?.generacion}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="generacionFechaInicio"
            label="Fecha de inicio de generación"
            name="generacionFechaInicio"
            auto="generacionFechaInicio"
            onchange={handleOnChange}
            type="date"
            value={data?.generacionFechaInicio}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="generacionFechaFin"
            label="Fecha de fin de generación"
            name="generacionFechaFin"
            auto="generacionFechaFin"
            onchange={handleOnChange}
            type="date"
            value={data?.generacionFechaFin}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={() => setOpen(false)}
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={() => {
              pathGrupo(form);
            }}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

GruposModal.propTypes = {
  type: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  setOpen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    turnoId: PropTypes.number,
    gradoId: PropTypes.number,
    descripcion: PropTypes.string,
    gradoNombre: PropTypes.string,
    generacion: PropTypes.string,
    generacionFechaInicio: PropTypes.string,
    generacionFechaFin: PropTypes.string,
  }).isRequired,
};
