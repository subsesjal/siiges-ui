import Tooltip from '@mui/material/Tooltip';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  ButtonsForm,
  Context,
  DataTable,
  DefaultModal,
  Input,
  LabelData,
  Select,
} from '@siiges-ui/shared';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../utils/FetchData';
import CalificacionInput from '../../../utils/CalificacionInput';

const domain = process.env.NEXT_PUBLIC_URL;

/* ----------------------------- columnas ----------------------------- */

const columns = (onDelete, onEdit, disabled) => [
  { field: 'materiasAntecedente', headerName: 'Materias de Antecedente', width: 280 },
  { field: 'calificacionAntecedente', headerName: 'Calificación Antecedente', width: 200 },
  { field: 'materiasEquivalentes', headerName: 'Materias Equivalentes', width: 280 },
  { field: 'calificacionEquivalente', headerName: 'Calificación Equivalente', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: ({ row }) => (
      !disabled ? (
        <>
          <Tooltip title="Editar">
            <IconButton onClick={() => onEdit(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => onDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Consultar">
          <IconButton onClick={() => onEdit(row)}>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
      )
    ),
  },
];

/* -------------------------- componente -------------------------- */

export default function CargaMateriasEquivalentes({
  form,
  handleOnChange,
  disabled,
  calificacionesReglas,
}) {
  const { setNoti, setLoading } = useContext(Context);

  const asignaturas = form?.interesado?.asignaturasAntecedenteEquivalente || [];
  const destino = form?.interesado?.institucionDestino;

  /* ---------------------------- UI ---------------------------- */

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  /* -------------------------- estados del modal -------------------------- */

  const [materiaAntecedente, setMateriaAntecedente] = useState('');
  const [calificacionAntecedente, setCalificacionAntecedente] = useState('');
  const [materiaEquivalente, setMateriaEquivalente] = useState('');
  const [calificacionEquivalente, setCalificacionEquivalente] = useState('');
  const [asignaturaId, setAsignaturaId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [materiasList, setMateriasList] = useState([]);
  const [programa, setPrograma] = useState({});
  const [asignaturaPrograma, setAsignaturaPrograma] = useState(null);

  /* ---------------------------- helpers ---------------------------- */

  const resetForm = () => {
    setOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
    setAsignaturaPrograma(null);

    setMateriaAntecedente('');
    setCalificacionAntecedente('');
    setMateriaEquivalente('');
    setCalificacionEquivalente('');
    setAsignaturaId(null);
  };

  /* ---------------------------- filas tabla ---------------------------- */

  const rows = useMemo(
    () => asignaturas.map((item, index) => ({
      id: index,
      asignaturaId: item.asignaturaId
        || item.asignaturaEquivalentePrograma?.asignaturaId,
      materiasAntecedente: item.nombreAsignaturaAntecedente,
      calificacionAntecedente: item.calificacionAntecedente,
      materiasEquivalentes: item.nombreAsignaturaEquivalente,
      calificacionEquivalente: item.calificacionEquivalente,
    })),
    [asignaturas],
  );

  /* -------------------------- fetch materias destino -------------------------- */

  const programaId = destino?.institucionDestinoPrograma?.programaId || destino?.programaId;
  const acuerdoRvoe = destino?.acuerdoRvoe;
  const tipoInstitucionId = destino?.tipoInstitucionId;

  useEffect(() => {
    if (programaId && tipoInstitucionId === 1) {
      fetchData(
        `${domain}/api/v1/public/asignaturas/programas/${programaId}`,
        setMateriasList,
      );

      if (acuerdoRvoe) {
        fetchData(
          `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
          setPrograma,
        );
      }
    }
  }, [programaId, tipoInstitucionId, acuerdoRvoe]);

  /* -------------------------- materia seleccionada -------------------------- */

  useEffect(() => {
    if (asignaturaId && materiasList.length) {
      const selected = materiasList.find(
        (m) => m.id === Number(asignaturaId),
      );
      setMateriaEquivalente(selected?.nombre || '');
      setAsignaturaPrograma(selected || null);
    }
  }, [asignaturaId, materiasList]);

  /* -------------------------- materias disponibles -------------------------- */

  const materiasDisponibles = useMemo(() => {
    const usadas = asignaturas.map(
      (a) => a.asignaturaId
        || a.asignaturaEquivalentePrograma?.asignaturaId,
    );

    return materiasList.filter(
      (m) => !usadas.includes(m.id)
        || (isEditing && m.id === asignaturaId),
    );
  }, [materiasList, asignaturas, isEditing, asignaturaId]);

  /* -------------------------- acciones -------------------------- */

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    try {
      handleOnChange(
        {
          target: {
            name: 'asignaturasAntecedenteEquivalente',
            value: asignaturas.filter((_, i) => i !== deleteIndex),
          },
        },
        ['interesado'],
      );

      setNoti({ open: true, type: 'success', message: 'Materia eliminada' });
    } finally {
      setLoading(false);
      setOpenDelete(false);
      setDeleteIndex(null);
    }
  };

  const handleEdit = (row) => {
    const index = asignaturas.findIndex(
      (a) => (a.asignaturaId
        || a.asignaturaEquivalentePrograma?.asignaturaId)
        === row.asignaturaId,
    );

    const item = asignaturas[index];

    setIsEditing(true);
    setEditingIndex(index);

    setMateriaAntecedente(item.nombreAsignaturaAntecedente);
    setCalificacionAntecedente(item.calificacionAntecedente);
    setMateriaEquivalente(item.nombreAsignaturaEquivalente);
    setCalificacionEquivalente(item.calificacionEquivalente);
    setAsignaturaId(row.asignaturaId);

    setOpen(true);
  };

  /* -------------------------- confirmar -------------------------- */

  const handleConfirm = () => {
    const nueva = {
      asignaturaId: asignaturaId ? Number(asignaturaId) : null,
      nombreAsignaturaAntecedente: materiaAntecedente,
      nombreAsignaturaEquivalente: materiaEquivalente,
      calificacionAntecedente,
      calificacionEquivalente,
    };

    const nuevas = [...asignaturas];

    if (isEditing) {
      nuevas[editingIndex] = { ...nuevas[editingIndex], ...nueva };
    } else {
      nuevas.push(nueva);
    }

    handleOnChange(
      {
        target: {
          name: 'asignaturasAntecedentesEquivalentes',
          value: nuevas,
        },
      },
      ['interesado'],
    );

    setNoti({
      open: true,
      type: 'success',
      message: isEditing ? 'Materia actualizada' : 'Materia agregada',
    });

    resetForm();
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <LabelData
            title="Calificación mínima"
            subtitle={calificacionesReglas.calificacionMinima}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelData
            title="Calificación máxima"
            subtitle={calificacionesReglas.calificacionMaxima}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelData
            title="Calificación aprobatoria"
            subtitle={calificacionesReglas.calificacionAprobatoria}
          />
        </Grid>

        <Grid item xs={12}>
          <DataTable
            buttonAdd={!disabled}
            buttonClick={() => {
              resetForm();
              setOpen(true);
            }}
            buttonText="Carga de Materia"
            title="Materias Equivalentes"
            rows={rows}
            columns={columns(handleDelete, handleEdit, disabled)}
          />
        </Grid>
      </Grid>

      <DefaultModal
        title={isEditing ? 'Editar Materia Equivalente' : 'Materias Equivalentes'}
        open={open}
        setOpen={setOpen}
      >
        <Grid container spacing={1}>
          {Object.keys(programa).length > 0 && (
            <>
              <Grid item xs={4}>
                <LabelData
                  title="Calificación mínima"
                  subtitle={programa.calificacionMinima}
                />
              </Grid>
              <Grid item xs={4}>
                <LabelData
                  title="Calificación máxima"
                  subtitle={programa.calificacionMaxima}
                />
              </Grid>
              <Grid item xs={4}>
                <LabelData
                  title="Calificación aprobatoria"
                  subtitle={programa.calificacionAprobatoria}
                />
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <Input
              label="Materias de Antecedente"
              value={materiaAntecedente}
              onChange={(e) => setMateriaAntecedente(e.target.value)}
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={6}>
            <CalificacionInput
              label="Calificación de Antecedente"
              value={calificacionAntecedente}
              onChange={(e) => setCalificacionAntecedente(e.target.value)}
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={6}>
            {materiasList.length > 0 ? (
              <Select
                title="Materias de Equivalente"
                options={materiasDisponibles}
                value={asignaturaId || ''}
                onChange={(e) => setAsignaturaId(e.target.value)}
                disabled={disabled}
              />
            ) : (
              <Input
                label="Materias de Equivalente"
                value={materiaEquivalente}
                onChange={(e) => setMateriaEquivalente(e.target.value)}
                disabled={disabled}
              />
            )}
          </Grid>

          <Grid item xs={6}>
            <CalificacionInput
              label="Calificación de Equivalente"
              value={calificacionEquivalente}
              onChange={(e) => setCalificacionEquivalente(e.target.value)}
              disabled={disabled}
              calificacionMinima={
                programa.calificacionMinima
                ?? calificacionesReglas.calificacionMinima
              }
              calificacionMaxima={
                programa.calificacionMaxima
                ?? calificacionesReglas.calificacionMaxima
              }
              calificacionDecimal={
                programa.calificacionDecimal
                ?? calificacionesReglas.calificacionDecimal
              }
            />
          </Grid>

          {asignaturaPrograma && (
          <>
            <Grid item xs={6}>
              <LabelData title="Academia" subtitle={asignaturaPrograma?.academia || '—'} />
            </Grid>
            <Grid item xs={6}>
              <LabelData title="Nombre" subtitle={asignaturaPrograma?.nombre || '—'} />
            </Grid>

            <Grid item xs={6}>
              <LabelData title="Clave" subtitle={asignaturaPrograma?.clave || '—'} />
            </Grid>
            <Grid item xs={6}>
              <LabelData title="Seriación" subtitle={asignaturaPrograma?.seriacion || '—'} />
            </Grid>

            <Grid item xs={6}>
              <LabelData title="Objetivo" subtitle={asignaturaPrograma?.objetivo || '—'} />
            </Grid>
            <Grid item xs={6}>
              <LabelData title="Temas" subtitle={asignaturaPrograma?.temas || '—'} />
            </Grid>

            <Grid item xs={6}>
              <LabelData title="Actividades" subtitle={asignaturaPrograma?.actividades || '—'} />
            </Grid>
            <Grid item xs={6}>
              <LabelData title="Modelo Institucional" subtitle={asignaturaPrograma?.modeloInstitucional || '—'} />
            </Grid>

            <Grid item xs={6}>
              <LabelData title="Tipo" subtitle={asignaturaPrograma?.tipo || '—'} />
            </Grid>
            <Grid item xs={6}>
              <LabelData title="Fecha Autorización" subtitle={asignaturaPrograma?.fechaAutorizacion || '—'} />
            </Grid>
          </>
          )}

          <Grid item xs={12}>
            <ButtonsForm
              confirm={handleConfirm}
              cancel={resetForm}
              confirmDisabled={disabled}
              confirmText={isEditing ? 'Actualizar' : 'Confirmar'}
            />
          </Grid>
        </Grid>
      </DefaultModal>
      <DefaultModal
        title="Eliminar materia equivalente"
        open={openDelete}
        setOpen={setOpenDelete}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro de eliminar esta materia equivalente?
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              confirm={confirmDelete}
              cancel={() => setOpenDelete(false)}
              confirmText="Eliminar"
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
      id: PropTypes.number.isRequired,
      asignaturasAntecedenteEquivalente: PropTypes.arrayOf(
        PropTypes.shape({
          asignaturaId: PropTypes.number,
          nombreAsignaturaAntecedente: PropTypes.string,
          nombreAsignaturaEquivalente: PropTypes.string,
          calificacionAntecedente: PropTypes.string,
          calificacionEquivalente: PropTypes.string,
          asignaturaEquivalentePrograma: PropTypes.shape({
            asignaturaId: PropTypes.number,
          }),
        }),
      ),
      institucionDestino: PropTypes.shape({
        programaId: PropTypes.number,
        acuerdoRvoe: PropTypes.string,
        tipoInstitucionId: PropTypes.number,
        institucionDestinoPrograma: PropTypes.shape({ programaId: PropTypes.number }),
      }),
    }),
  }).isRequired,

  handleOnChange: PropTypes.func,
  disabled: PropTypes.bool,

  calificacionesReglas: PropTypes.shape({
    calificacionMinima: PropTypes.number,
    calificacionMaxima: PropTypes.number,
    calificacionAprobatoria: PropTypes.number,
    calificacionDecimal: PropTypes.bool,
  }),
};

CargaMateriasEquivalentes.defaultProps = {
  handleOnChange: () => {},
  disabled: false,
  calificacionesReglas: {},
};
