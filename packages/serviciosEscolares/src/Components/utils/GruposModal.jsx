import { Grid } from '@mui/material';
import {
  ButtonStyled,
  DefaultModal,
  Input,
  LabelData,
  Select,
} from '@siiges-ui/shared';
import React from 'react';

export default function GruposModal({ open, setOpen, type }) {
  const title = type === "new" ? "Agregar Grupo" : "Editar Grupo";
  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <LabelData title="ID" subtitle="288" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Ciclo Escolar ID" subtitle="882" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Grado" subtitle="Primer Semestre" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Input
            id="grupo"
            label="Grupo"
            name="grupo"
            auto="grupo"
            onchange={() => {}}
            value=""
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Turno" options={[]} />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="generacion"
            label="Generación"
            name="generacion"
            auto="generacion"
            onchange={() => {}}
            value=""
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="fechaInicio"
            label="Fecha de inicio de generación"
            name="fechaInicio"
            auto="fechaInicio"
            onchange={() => {}}
            type="date"
            value=""
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="fechaFin"
            label="Fecha de fin de generación"
            name="fechaFin"
            auto="fechaFin"
            onchange={() => {}}
            type="date"
            value=""
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
              console.log('confirmar');
            }}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}
