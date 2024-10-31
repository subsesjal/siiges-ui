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
  const [materiaAntecedente, setMateriaAntecedente] = useState('');
  const [calificacionAntecedente, setCalificacionAntecedente] = useState('');
  const [materiaEquivalente, setMateriaEquivalente] = useState('');
  const [calificacionEquivalente, setCalificacionEquivalente] = useState('');

  const handleConfirm = () => {
    handleOnChange(
      { target: { name: 'asignaturaAntecedente', value: [...form.asignaturaAntecedente, { nombre: materiaAntecedente, calificacion: calificacionAntecedente }] } },
      [],
    );
    handleOnChange(
      { target: { name: 'asignaturaEquivalente', value: [...form.asignaturaEquivalente, { nombre: materiaEquivalente, calificacion: calificacionEquivalente }] } },
      [],
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
          rows={
            form.asignaturaAntecedente.concat(form.asignaturaEquivalente).map((item, index) => ({
              id: index,
              materiasAntecedente: item.nombre,
              calificacionAntecedente: item.calificacion,
              materiasEquivalentes: item.nombre,
              calificacionEquivalente: item.calificacion,
            }))
          }
          columns={columns}
        />
      </Grid>
      <DefaultModal title="Materias Equivalentes" open={open} setOpen={setOpen}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Input
              id="materiaAntecedente"
              name="materiaAntecedente"
              label="Materias de Antecedente"
              value={materiaAntecedente}
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
              id="materiaEquivalente"
              name="materiaEquivalente"
              label="Materias de Equivalente"
              value={materiaEquivalente}
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
    asignaturaAntecedente: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string,
        calificacion: PropTypes.string,
      }),
    ),
    asignaturaEquivalente: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string,
        calificacion: PropTypes.string,
      }),
    ),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
