import Tooltip from '@mui/material/Tooltip';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import fetchData from '../../../utils/FetchData';
import CalificacionInput from '../../../utils/CalificacionInput';

const columns = (handleDelete, handleEdit, disabled) => [
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
    renderCell: (params) => (!disabled ? (
      <>
        <Tooltip title="Editar" placement="top">
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar" placement="top">
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ) : (
      <Tooltip title="Consultar" placement="top">
        <IconButton onClick={() => handleEdit(params.row)}>
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>
    )),
  },
];

const domain = process.env.NEXT_PUBLIC_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function CargaMateriasEquivalentes({
  form,
  handleOnChange,
  disabled,
  calificacionesReglas,
}) {
  const asignaturas = form?.interesado?.asignaturasAntecedenteEquivalente || [];

  const { setNoti, setLoading } = useContext(Context);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [materiaAntecedente, setMateriaAntecedente] = useState('');
  const [calificacionAntecedente, setCalificacionAntecedente] = useState('');
  const [materiaEquivalente, setMateriaEquivalente] = useState('');
  const [asignaturaId, setAsignaturaId] = useState(null);
  const [programa, setPrograma] = useState({});
  const [calificacionEquivalente, setCalificacionEquivalente] = useState('');
  const [materiasList, setMateriasList] = useState([]);
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [detalleAsignatura, setDetalleAsignatura] = useState(null);
  const [editingBackendId, setEditingBackendId] = useState(null);

  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setIsEditing(false);
    setAsignaturaId(null);
    setMateriaAntecedente('');
    setCalificacionAntecedente('');
    setMateriaEquivalente('');
    setCalificacionEquivalente('');
    setDetalleAsignatura(null);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    setOpenDelete(false);

    try {
      const updatedList = asignaturas.filter((_, i) => i !== deleteIndex);

      handleOnChange(
        {
          target: {
            name: 'asignaturasAntecedenteEquivalente',
            value: updatedList,
          },
        },
        ['interesado'],
      );

      setNoti({
        open: true,
        type: 'success',
        message: 'Materia equivalente eliminada',
      });
    } catch (error) {
      console.error(error);
      setNoti({
        open: true,
        type: 'error',
        message: 'Error al eliminar la materia equivalente',
      });
    } finally {
      setLoading(false);
      setDeleteIndex(null);
    }
  };

  const handleEdit = async (row) => {
    const index = asignaturas.findIndex(
      (item) => (item.asignaturaId
        || item.asignaturaEquivalentePrograma?.asignaturaId)
      === row.asignaturaId,
    );

    const backendId = asignaturas[index]?.id || null;

    setEditingId(index);
    setIsEditing(true);

    setMateriaAntecedente(row.materiasAntecedente);
    setCalificacionAntecedente(row.calificacionAntecedente);
    setMateriaEquivalente(row.materiasEquivalentes);
    setCalificacionEquivalente(row.calificacionEquivalente);
    setAsignaturaId(row.asignaturaId);

    setEditingBackendId(backendId);

    if (backendId) {
      fetchData(
        `${domain}/api/v1/public/asignaturasAntecedenteEquivalente/${backendId}`,
        setDetalleAsignatura,
      );
    } else {
      setDetalleAsignatura(null);
    }

    setOpen(true);
  };

  const handleConfirm = async () => {
    if (
      !materiaAntecedente
    || !materiaEquivalente
    || !calificacionAntecedente
    || !calificacionEquivalente
    || !form?.interesado?.id
    ) {
      setNoti({
        open: true,
        type: 'warning',
        message: 'Completa todos los campos obligatorios',
      });
      return;
    }

    const payload = {
      interesadoId: form.interesado.id,
      nombreAsignaturaAntecedente: materiaAntecedente,
      calificacionAntecedente,
      nombreAsignaturaEquivalente: materiaEquivalente,
      calificacionEquivalente,
      ...(asignaturaId && { asignaturaId }),
    };

    setLoading(true);
    setOpen(false);

    try {
      const url = isEditing
        ? `${domain}/api/v1/public/asignaturasAntecedenteEquivalente/${editingBackendId}`
        : `${domain}/api/v1/public/asignaturasAntecedenteEquivalente`;

      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', api_key: apiKey },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al guardar asignatura equivalente');
      }

      const updatedList = [...asignaturas];

      if (isEditing && editingId !== null) {
        updatedList[editingId] = {
          ...updatedList[editingId],
          ...payload,
        };
      } else {
        updatedList.push(payload);
      }

      handleOnChange(
        {
          target: {
            name: 'asignaturasAntecedenteEquivalente',
            value: updatedList,
          },
        },
        ['interesado'],
      );

      setNoti({
        open: true,
        type: 'success',
        message: isEditing
          ? 'Materia equivalente actualizada correctamente'
          : 'Materia equivalente agregada correctamente',
      });

      resetForm();
    } catch (error) {
      console.error(error);

      setNoti({
        open: true,
        type: 'error',
        message: 'Ocurrió un error al guardar la materia equivalente',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRows(
      asignaturas.map((item, index) => ({
        id: index,
        asignaturaId:
          item.asignaturaId
          || item.asignaturaEquivalentePrograma?.asignaturaId,
        materiasAntecedente: item.nombreAsignaturaAntecedente,
        calificacionAntecedente: item.calificacionAntecedente,
        materiasEquivalentes: item.nombreAsignaturaEquivalente,
        calificacionEquivalente: item.calificacionEquivalente,
      })),
    );
  }, [asignaturas]);

  useEffect(() => {
    if (asignaturaId && materiasList.length > 0) {
      const selected = materiasList.find(
        (m) => m.id === Number(asignaturaId),
      );
      setMateriaEquivalente(selected?.nombre || '');
    }
  }, [asignaturaId, materiasList]);

  useEffect(() => {
    const destino = form?.interesado?.institucionDestino;

    if (
      destino?.institucionDestinoPrograma?.programaId
      && destino?.tipoInstitucionId === 1
    ) {
      fetchData(
        `${domain}/api/v1/public/asignaturas/programas/${destino.institucionDestinoPrograma.programaId}`,
        setMateriasList,
      );
      fetchData(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${destino.acuerdoRvoe}`,
        setPrograma,
      );
    } else {
      setMateriasList([]);
      setAsignaturaId(null);
    }
  }, [form?.interesado?.institucionDestino]);

  const materiasDisponibles = useMemo(() => {
    const usados = asignaturas.map(
      (item) => item.asignaturaId
        || item.asignaturaEquivalentePrograma?.asignaturaId,
    );

    return materiasList.filter((m) => (isEditing && asignaturaId
      ? !usados.includes(m.id) || m.id === asignaturaId
      : !usados.includes(m.id)));
  }, [materiasList, asignaturas, isEditing, asignaturaId]);

  const asignaturaPrograma = detalleAsignatura?.asignaturaEquivalentePrograma?.asignatura;

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
