import { Grid } from '@mui/material';
import {
  ButtonsForm, DataTable, DefaultModal, Input,
} from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

export default function CargaMateriasEquivalentes({ form, handleOnChange }) {
  const [open, setOpen] = useState(false);
  const [nombreAsignaturaAntecedente, setMateriaAntecedente] = useState('');
  const [calificacionAntecedente, setCalificacionAntecedente] = useState('');
  const [nombreAsignaturaEquivalente, setMateriaEquivalente] = useState('');
  const [calificacionEquivalente, setCalificacionEquivalente] = useState('');

  const handleConfirm = () => {
    const newEntry = {
      asignaturaId: 1,
      nombreAsignaturaEquivalente,
      calificacionEquivalente,
      nombreAsignaturaAntecedente,
      calificacionAntecedente,
    };

    handleOnChange(
      {
        target: {
          name: 'asignaturasAntecedentesEquivalentes',
          value: [...form.interesado.asignaturasAntecedentesEquivalentes, newEntry],
        },
      },
      ['interesado'],
    );

    setOpen(false);
    setMateriaAntecedente('');
    setCalificacionAntecedente('');
    setMateriaEquivalente('');
    setCalificacionEquivalente('');
  };

  return (
    <>
      <Grid container spacing={1}>
        <DataTable
          buttonAdd
          buttonClick={() => setOpen(true)}
          buttonText="Carga de Materia"
          rows={form.interesado.asignaturasAntecedentesEquivalentes?.map((item, index) => ({
            id: index,
            materiasAntecedente: item.nombreAsignaturaAntecedente,
            calificacionAntecedente: item.calificacionAntecedente,
            materiasEquivalentes: item.nombreAsignaturaEquivalente,
            calificacionEquivalente: item.calificacionEquivalente,
          }))}
          columns={columns}
        />
      </Grid>
      <DefaultModal title="Materias Equivalentes" open={open} setOpen={setOpen}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Input
              id="nombreAsignaturaAntecedente"
              name="nombreAsignaturaAntecedente"
              label="Materias de Antecedente"
              value={nombreAsignaturaAntecedente}
              onChange={(e) => setMateriaAntecedente(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="calificacionAntecedente"
              name="calificacionAntecedente"
              label="Calificación de Antecedente"
              value={calificacionAntecedente}
              onChange={(e) => setCalificacionAntecedente(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="nombreAsignaturaEquivalente"
              name="nombreAsignaturaEquivalente"
              label="Materias de Equivalente"
              value={nombreAsignaturaEquivalente}
              onChange={(e) => setMateriaEquivalente(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="calificacionEquivalente"
              name="calificacionEquivalente"
              label="Calificación de Equivalente"
              value={calificacionEquivalente}
              onChange={(e) => setCalificacionEquivalente(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              confirm={handleConfirm}
              cancel={() => setOpen(false)}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </>
  );
}

CargaMateriasEquivalentes.propTypes = {
  form: PropTypes.shape({
    interesado: PropTypes.shape({
      asignaturasAntecedentesEquivalentes: PropTypes.arrayOf(
        PropTypes.shape({
          asignaturaId: PropTypes.number,
          nombreAsignaturaEquivalente: PropTypes.string,
          calificacionEquivalente: PropTypes.string,
          nombreAsignaturaAntecedente: PropTypes.string,
          calificacionAntecedente: PropTypes.string,
        }),
      ),
      institucionDestino: PropTypes.shape({
        programaId: PropTypes.number,
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
