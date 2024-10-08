import { Grid } from '@mui/material';
import {
  ButtonsForm, DataTable, DefaultModal, Input,
} from '@siiges-ui/shared';
import React, { useState } from 'react';

const columns = [
  {
    field: 'materiasAntecedente',
    headerName: 'Materias de Antecedente',
    width: 350,
  },
  {
    field: 'calificacionAntecedente',
    headerName: 'Calificación Antecedente',
    width: 200,
  },
  {
    field: 'materiasEquivalentes',
    headerName: 'Materias Equivalentes',
    width: 350,
  },
  {
    field: 'calificacionEquivalente',
    headerName: 'Calificación Equivalente',
    width: 200,
  },
];

export default function CargaMateriasEquivalentes() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid container spacing={1}>
        <DataTable
          buttonAdd
          buttonClick={() => {
            setOpen(true);
          }}
          buttonText="Carga de Materia"
          rows={[]}
          columns={columns}
        />
      </Grid>
      <DefaultModal title="Materias Equivalentes" open={open} setOpen={setOpen}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Input
              id="materiaAntecedente"
              name="materiaAntecedente"
              label=" Materias de Antecedente"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="calificacionAntecedente"
              name="calificacionAntecedente"
              label=" Calificación de Antecedente"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="materiaEquivalente"
              name="materiaEquivalente"
              label=" Materias de Equivalente"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="materiaEquivalente"
              name="materiaEquivalente"
              label=" Materias de Equivalente"
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              confirm={() => {}}
              cancel={() => {
                setOpen(false);
              }}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </>
  );
}
