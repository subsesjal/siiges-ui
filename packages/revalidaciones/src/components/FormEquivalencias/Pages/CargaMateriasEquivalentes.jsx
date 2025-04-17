import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  ButtonsForm, DataTable, DefaultModal, Input, Select,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../utils/FetchData';

const columns = (handleDelete, handleEdit) => [
  {
    field: 'materiasAntecedente',
    headerName: 'Materias de Antecedente',
    width: 280,
  },
  {
    field: 'calificacionAntecedente',
    headerName: 'Calificación Antecedente',
    width: 200,
  },
  {
    field: 'materiasEquivalentes',
    headerName: 'Materias Equivalentes',
    width: 280,
  },
  {
    field: 'calificacionEquivalente',
    headerName: 'Calificación Equivalente',
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton
          onClick={() => handleEdit(params.row)}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const domain = process.env.NEXT_PUBLIC_URL;

export default function CargaMateriasEquivalentes({ form, handleOnChange }) {
  const [open, setOpen] = useState(false);
  const [nombreAsignaturaAntecedente, setMateriaAntecedente] = useState('');
  const [calificacionAntecedente, setCalificacionAntecedente] = useState('');
  const [nombreAsignaturaEquivalente, setMateriaEquivalente] = useState('');
  const [asignaturaId, setAsignaturaId] = useState(null);
  const [calificacionEquivalente, setCalificacionEquivalente] = useState('');
  const [materiasList, setMateriasList] = useState([]);
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id) => {
    if (form?.interesado?.asignaturasAntecedentesEquivalentes) {
      const updatedList = form.interesado.asignaturasAntecedentesEquivalentes.filter(
        (_, index) => index !== id,
      );

      handleOnChange(
        {
          target: {
            name: 'asignaturasAntecedentesEquivalentes',
            value: updatedList,
          },
        },
        ['interesado'],
      );
    }
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setIsEditing(true);
    setMateriaAntecedente(row.materiasAntecedente);
    setCalificacionAntecedente(row.calificacionAntecedente);
    setMateriaEquivalente(row.materiasEquivalentes);
    setCalificacionEquivalente(row.calificacionEquivalente);
    setAsignaturaId(row.asignaturaId);
    setOpen(true);
  };

  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setIsEditing(false);
    setAsignaturaId(null);
    setMateriaAntecedente('');
    setCalificacionAntecedente('');
    setMateriaEquivalente('');
    setCalificacionEquivalente('');
  };

  const handleConfirm = () => {
    const newEntry = {
      asignaturaId,
      nombreAsignaturaEquivalente,
      calificacionEquivalente,
      nombreAsignaturaAntecedente,
      calificacionAntecedente,
    };

    let updatedList;
    if (isEditing) {
      updatedList = [...form.interesado.asignaturasAntecedentesEquivalentes];
      updatedList[editingId] = newEntry;
    } else {
      updatedList = [...form.interesado.asignaturasAntecedentesEquivalentes, newEntry];
    }

    handleOnChange(
      {
        target: {
          name: 'asignaturasAntecedentesEquivalentes',
          value: updatedList,
        },
      },
      ['interesado'],
    );

    resetForm();
  };

  useEffect(() => {
    if (form?.interesado?.asignaturasAntecedentesEquivalentes) {
      setRows(
        form.interesado.asignaturasAntecedentesEquivalentes.map((item, index) => ({
          id: index,
          asignaturaId: item.asignaturaId,
          materiasAntecedente: item.nombreAsignaturaAntecedente,
          calificacionAntecedente: item.calificacionAntecedente,
          materiasEquivalentes: item.nombreAsignaturaEquivalente,
          calificacionEquivalente: item.calificacionEquivalente,
        })),
      );
    }
  }, [form]);

  useEffect(() => {
    if (asignaturaId && materiasList?.length > 0) {
      const selectedMateria = materiasList.find(
        (materia) => materia.id === parseInt(asignaturaId, 10),
      );
      if (selectedMateria) {
        setMateriaEquivalente(selectedMateria.nombre);
      } else {
        setMateriaEquivalente('');
      }
    } else {
      setMateriaEquivalente('');
    }
  }, [asignaturaId, materiasList]);

  useEffect(() => {
    if (
      form.interesado?.institucionDestino?.programaId !== null
      && form.interesado?.institucionDestino?.tipoInstitucionId === 1
    ) {
      fetchData(
        `${domain}/api/v1/public/asignaturas/programas/${form.interesado?.institucionDestino?.programaId}`,
        setMateriasList,
      );
    } else {
      setMateriasList([]);
      setAsignaturaId(null);
    }
  }, [
    form.interesado?.institucionDestino?.programaId,
    form.interesado?.institucionDestino?.tipoInstitucionId,
  ]);

  return (
    <>
      <Grid container spacing={1}>
        <DataTable
          buttonAdd
          buttonClick={() => {
            resetForm();
            setOpen(true);
          }}
          buttonText="Carga de Materia"
          rows={rows}
          columns={columns(handleDelete, handleEdit)}
        />
      </Grid>
      <DefaultModal
        title={isEditing ? 'Editar Materia Equivalente' : 'Materias Equivalentes'}
        open={open}
        setOpen={setOpen}
      >
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
            {materiasList?.length > 0 ? (
              <Select
                title="Materias de Equivalente"
                options={materiasList}
                name="nombreAsignaturaEquivalente"
                value={asignaturaId || ''}
                onChange={(e) => setAsignaturaId(e.target.value)}
              />
            )
              : (
                <Input
                  id="nombreAsignaturaEquivalente"
                  name="nombreAsignaturaEquivalente"
                  label="Materias de Equivalente"
                  value={nombreAsignaturaEquivalente}
                  onChange={(e) => setMateriaEquivalente(e.target.value)}
                />
              )}
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
              cancel={resetForm}
              confirmText={isEditing ? 'Actualizar' : 'Confirmar'}
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
        tipoInstitucionId: PropTypes.number,
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
