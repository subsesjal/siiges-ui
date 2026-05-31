import { Grid, Checkbox, Typography } from '@mui/material';
import {
  ButtonSimple, DefaultModal, InputDate, DataTable, LabelData,
  createRecord, getData, updateRecord, useUI,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const SITUACION_EGRESADO = 3;
const TIPO_DOCUMENTO_CERTIFICADO = 2;

export default function ModalCertificado({
  open,
  setOpen,
  type,
  id,
  programaId,
  setAlumnoResponse,
  rowData,
  disabled,
  alumnosAgregados,
}) {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [alumnoNombre, setAlumnoNombre] = useState('');
  const [form, setForm] = useState({
    fechaTerminacion: '',
    fechaExpedicion: '',
  });
  const { setNoti, setLoading } = useUI();

  const isCreateMode = type === 'create';
  const isEditMode = type === 'edit';
  const isConsultMode = type === 'consult';
  const isDisabled = disabled || isConsultMode;

  const alumnosAgregadosIds = alumnosAgregados.map((a) => a.alumnoId);

  const getModalTitle = () => {
    if (isEditMode) return 'Editar Alumno';
    if (isConsultMode) return 'Consultar Alumno';
    return 'Agregar Alumnos';
  };

  useEffect(() => {
    if (open && isCreateMode && programaId) {
      setLoadingAlumnos(true);
      getData({
        endpoint: `/solicitudesFolios/alumnos/programas/${programaId}?situacionId=${SITUACION_EGRESADO}&tipoDocumentoId=${TIPO_DOCUMENTO_CERTIFICADO}`,
      })
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            const alumnosFiltrados = response.data.filter(
              (alumno) => !alumnosAgregadosIds.includes(alumno.id),
            );
            setAlumnos(alumnosFiltrados);
          }
        })
        .catch((error) => {
          setNoti({
            open: true,
            message: `Error al cargar alumnos: ${error.message}`,
            type: 'error',
          });
        })
        .finally(() => {
          setLoadingAlumnos(false);
        });
    }
  }, [open, type, programaId]);

  useEffect(() => {
    if (open && (isEditMode || isConsultMode) && rowData) {
      setForm({
        id: rowData.id,
        fechaTerminacion: rowData.fechaTerminacion || '',
        fechaExpedicion: rowData.fechaExpedicion || '',
      });

      if (rowData.alumno?.persona) {
        const { nombre, apellidoPaterno, apellidoMaterno } = rowData.alumno.persona;
        setAlumnoNombre(`${nombre || ''} ${apellidoPaterno || ''} ${apellidoMaterno || ''}`.trim());
      }
    }
  }, [open, type, rowData]);

  useEffect(() => {
    if (!open) {
      setSelectedAlumnos([]);
      setAlumnos([]);
      setAlumnoNombre('');
      setForm({
        fechaTerminacion: '',
        fechaExpedicion: '',
      });
    }
  }, [open]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedAlumnos(alumnos.map((alumno) => alumno.id));
    } else {
      setSelectedAlumnos([]);
    }
  };

  const handleSelectAlumno = (alumnoId) => {
    setSelectedAlumnos((prev) => {
      if (prev.includes(alumnoId)) {
        return prev.filter((idAlumno) => idAlumno !== alumnoId);
      }
      return [...prev, alumnoId];
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleConfirmCreate = async () => {
    if (selectedAlumnos.length === 0) {
      setNoti({
        open: true,
        message: 'Debe seleccionar al menos un alumno',
        type: 'warning',
      });
      return;
    }

    if (!form.fechaTerminacion) {
      setNoti({
        open: true,
        message: 'Debe ingresar la fecha de terminación',
        type: 'warning',
      });
      return;
    }

    setLoading(true);

    const payload = selectedAlumnos.map((alumnoId) => ({
      alumnoId,
      fechaTerminacion: dayjs(form.fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ'),
    }));

    try {
      const response = await createRecord({
        endpoint: `/solicitudesFolios/${id}/alumnos`,
        data: payload,
      });

      if (response.statusCode === 201) {
        const { agregados, rechazados } = response.data;

        if (agregados > 0 && rechazados === 0) {
          setNoti({
            open: true,
            message: `${agregados} alumno(s) agregado(s) exitosamente`,
            type: 'success',
          });
        } else if (agregados > 0 && rechazados > 0) {
          setNoti({
            open: true,
            message: `${agregados} agregado(s), ${rechazados} rechazado(s)`,
            type: 'warning',
          });
        } else {
          setNoti({
            open: true,
            message: 'No se pudo agregar ningún alumno',
            type: 'error',
          });
        }

        setAlumnoResponse(true);
        setOpen(false);
      } else {
        setNoti({
          open: true,
          message: 'Error al agregar alumnos',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEdit = async () => {
    setLoading(true);

    const formattedForm = {
      fechaTerminacion: form.fechaTerminacion
        ? dayjs(form.fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
    };

    try {
      const response = await updateRecord({
        endpoint: `/solicitudesFolios/solicitudesFoliosAlumnos/${form.id}`,
        data: formattedForm,
      });

      if (response.statusCode === 200) {
        setNoti({
          open: true,
          message: 'Registro actualizado exitosamente',
          type: 'success',
        });
        setAlumnoResponse(true);
        setOpen(false);
      } else {
        setNoti({
          open: true,
          message: 'Error al actualizar el registro',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (isCreateMode) {
      handleConfirmCreate();
    } else if (isEditMode) {
      handleConfirmEdit();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const allSelected = alumnos.length > 0 && selectedAlumnos.length === alumnos.length;
  const someSelected = selectedAlumnos.length > 0 && selectedAlumnos.length < alumnos.length;

  const columns = [
    {
      field: 'seleccionar',
      headerName: '',
      width: 90,
      sortable: false,
      renderHeader: () => (
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={handleSelectAll}
          disabled={isDisabled || alumnos.length === 0}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedAlumnos.includes(params.row.id)}
          onChange={() => handleSelectAlumno(params.row.id)}
          disabled={isDisabled}
        />
      ),
    },
    { field: 'matricula', headerName: 'Matrícula', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 300 },
    { field: 'situacion', headerName: 'Situación', width: 150 },
  ];

  const rows = alumnos.map((alumno) => ({
    id: alumno.id,
    matricula: alumno.matricula,
    nombre: `${alumno.persona?.nombre || ''} ${alumno.persona?.apellidoPaterno || ''} ${alumno.persona?.apellidoMaterno || ''}`.trim(),
    situacion: alumno.situacion?.nombre || 'Sin situación',
  }));

  const isConfirmDisabledCreate = isDisabled
    || selectedAlumnos.length === 0
    || !form.fechaTerminacion;

  const isConfirmDisabledEdit = isDisabled || !form.fechaTerminacion;

  return (
    <DefaultModal title={getModalTitle()} open={open} setOpen={setOpen} size={isCreateMode ? 'lg' : 'md'}>
      <Grid container spacing={2}>
        {isCreateMode && (
          <>
            <Grid item xs={12}>
              <InputDate
                label="Fecha de terminación plan de estudios"
                id="fechaTerminacion"
                name="fechaTerminacion"
                type="datetime"
                value={form.fechaTerminacion}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {`Alumnos disponibles: ${alumnos.length} | Seleccionados: ${selectedAlumnos.length}`}
              </Typography>
              <DataTable
                rows={rows}
                columns={columns}
                loading={loadingAlumnos}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Grid>
          </>
        )}
        {(isEditMode || isConsultMode) && (
          <>
            <Grid item xs={12}>
              <LabelData title="Matrícula" subtitle={rowData?.alumno?.matricula || ''} />
            </Grid>
            <Grid item xs={12}>
              <LabelData title="Alumno" subtitle={alumnoNombre} />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de elaboración de certificado"
                id="fechaExpedicion"
                name="fechaExpedicion"
                type="datetime"
                value={form.fechaExpedicion}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de terminación plan de estudios"
                id="fechaTerminacion"
                name="fechaTerminacion"
                type="datetime"
                value={form.fechaTerminacion}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <ButtonSimple text="Regresar" design="enviar" onClick={handleCancel} />
            </Grid>
            {!isConsultMode && (
              <Grid item>
                <ButtonSimple
                  text={isCreateMode ? 'Agregar Alumnos' : 'Guardar'}
                  design="guardar"
                  onClick={handleConfirm}
                  disabled={isCreateMode ? isConfirmDisabledCreate : isConfirmDisabledEdit}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

ModalCertificado.defaultProps = {
  id: null,
  programaId: null,
  disabled: false,
  alumnosAgregados: [],
  rowData: null,
};

ModalCertificado.propTypes = {
  open: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  setAlumnoResponse: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
  programaId: PropTypes.number,
  alumnosAgregados: PropTypes.arrayOf(
    PropTypes.shape({
      alumnoId: PropTypes.number.isRequired,
    }),
  ),
  rowData: PropTypes.shape({
    id: PropTypes.number,
    alumnoId: PropTypes.number,
    fechaTerminacion: PropTypes.string,
    fechaExpedicion: PropTypes.string,
    alumno: PropTypes.shape({
      id: PropTypes.number,
      matricula: PropTypes.string,
      persona: PropTypes.shape({
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
      }),
    }),
  }),
};
