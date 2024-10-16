import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  InputDate,
  LabelData,
  Select,
} from '@siiges-ui/shared';
import grupoService from './gruposService';

const turnos = [
  { id: 1, nombre: 'Matutino' },
  { id: 2, nombre: 'Vespertino' },
  { id: 3, nombre: 'Nocturno' },
  { id: 4, nombre: 'Mixto' },
];
export default function GruposModal({
  open,
  setOpen,
  type,
  data,
  params,
  fetchGrupos,
}) {
  const title = type === 'new' ? 'Agregar Grupo' : 'Editar Grupo';
  const { setNoti, setLoading } = useContext(Context);
  const [form, setForm] = useState();
  const pathGrupo = async (dataform) => {
    setLoading(true);
    const dataBody = { ...dataform, ...params };
    try {
      let result;
      if (data?.id) {
        result = await grupoService({ id: data.id, dataBody });
      } else {
        result = await grupoService({ dataBody });
      }

      if (result) {
        setLoading(false);
        setNoti({
          open: true,
          message: '¡Grupo creado con éxito!',
          type: 'success',
        });
        if (fetchGrupos) {
          fetchGrupos(params.gradoId);
        }
      }

      setOpen(false);
    } catch (error) {
      setLoading(false);
      setNoti({
        open: true,
        message: `¡Error al guardar Grupo!: ${error}`,
        type: 'error',
      });
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={1}>
        {data?.id && (
          <Grid item xs={2}>
            <LabelData title="ID" subtitle={data?.id} />
          </Grid>
        )}
        <Grid item xs={4}>
          <LabelData
            title="Ciclo Escolar ID"
            subtitle={params?.cicloEscolarId}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Grado" subtitle={params?.gradoNombre} />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Input
            id="descripcion"
            label="Descripción"
            name="descripcion"
            auto="descripcion"
            onChange={handleOnChange}
            value={data?.descripcion}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Turno"
            value={data?.turnoId}
            options={turnos}
            onChange={handleOnChange}
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
            onChange={handleOnChange}
            value={data?.generacion}
          />
        </Grid>
        <Grid item xs={6}>
          <InputDate
            id="generacionFechaInicio"
            label="Fecha de inicio de generación"
            name="generacionFechaInicio"
            auto="generacionFechaInicio"
            onChange={handleOnChange}
            type="date"
            value={data?.generacionFechaInicio}
          />
        </Grid>
        <Grid item xs={6}>
          <InputDate
            id="generacionFechaFin"
            label="Fecha de fin de generación"
            name="generacionFechaFin"
            auto="generacionFechaFin"
            onChange={handleOnChange}
            type="date"
            value={data?.generacionFechaFin}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <ButtonsForm
            confirm={() => {
              pathGrupo(form);
            }}
            cancel={() => setOpen(false)}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

GruposModal.defaultProps = {
  fetchGrupos: () => {},
};

GruposModal.propTypes = {
  type: PropTypes.string.isRequired,
  params: PropTypes.shape({
    cicloEscolarId: PropTypes.number,
    gradoNombre: PropTypes.string,
    gradoId: PropTypes.number,
  }).isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  fetchGrupos: PropTypes.func,
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
