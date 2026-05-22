import { Grid, Checkbox, Typography } from '@mui/material';
import {
  ButtonSimple, DefaultModal, InputDate, DataTable, Select, Input, LabelData,
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
const TIPO_DOCUMENTO_TITULO = 1;

const modalidadTitulacionOptions = [
  { id: 1, nombre: 'Por Tesis' },
  { id: 2, nombre: 'Por Promedio' },
  { id: 3, nombre: 'Por Estudios de Posgrados' },
  { id: 4, nombre: 'Por Experiencia Laboral' },
  { id: 5, nombre: 'Por Ceneval' },
  { id: 6, nombre: 'Otro' },
];

const cumplioServicioSocialOptions = [
  { id: 1, nombre: 'Sí' },
  { id: 2, nombre: 'No' },
];

const fundamentoLegalOptions = [
  { id: 1, nombre: 'ART. 52 LRART. 5 CONST' },
  { id: 2, nombre: 'ART. 55 LRART. 5 CONST' },
  { id: 3, nombre: 'ART. 91 LRART. 5 CONST' },
  {
    id: 4,
    nombre: 'ART. 10 REGLAMENTO PARA LA PRESTACIÓN DEL SERVICIO SOCIAL DE LOS ESTUDIANTES DE LAS INSTITUCIONES DE EDUCACIÓN SUPERIOR EN LA REPÚBLICA MEXICANA',
  },
  { id: 5, nombre: 'NO APLICA' },
];

const booleanToSelectId = (value) => {
  if (value === true || value === 1) return 1;
  if (value === false || value === 0) return 2;
  return '';
};

export default function ModalTitulo({
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
    fechaInicio: '',
    fechaTerminacion: '',
    fechaExamenProfesional: '',
    modalidadTitulacionId: '',
    cumplioServicioSocial: '',
    fundamentoServicioSocialId: '',
    folioActa: '',
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
        endpoint: `/solicitudesFolios/alumnos/programas/${programaId}?situacionId=${SITUACION_EGRESADO}&tipoDocumentoId=${TIPO_DOCUMENTO_TITULO}`,
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
        fechaInicio: rowData.fechaInicio || '',
        fechaTerminacion: rowData.fechaTerminacion || '',
        fechaExamenProfesional: rowData.fechaExamenProfesional || '',
        modalidadTitulacionId: rowData.modalidadTitulacionId || '',
        cumplioServicioSocial: booleanToSelectId(rowData.cumplioServicioSocial),
        fundamentoServicioSocialId: rowData.fundamentoServicioSocialId || '',
        folioActa: rowData.folioActa || '',
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
        fechaInicio: '',
        fechaTerminacion: '',
        fechaExamenProfesional: '',
        modalidadTitulacionId: '',
        cumplioServicioSocial: '',
        fundamentoServicioSocialId: '',
        folioActa: '',
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

  const handleSelectChange = (name) => (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: event.target.value,
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

    setLoading(true);

    const payload = selectedAlumnos.map((alumnoId) => ({
      alumnoId,
      fechaInicio: form.fechaInicio
        ? dayjs(form.fechaInicio).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaTerminacion: dayjs(form.fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ'),
      fechaExamenProfesional: form.fechaExamenProfesional
        ? dayjs(form.fechaExamenProfesional).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      modalidadTitulacionId: form.modalidadTitulacionId || null,
      cumplioServicioSocial: form.cumplioServicioSocial === ''
        ? null
        : form.cumplioServicioSocial === 1 || form.cumplioServicioSocial === '1',
      fundamentoServicioSocialId: form.fundamentoServicioSocialId || null,
      folioActa: form.folioActa || '',
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
      fechaInicio: form.fechaInicio
        ? dayjs(form.fechaInicio).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaTerminacion: form.fechaTerminacion
        ? dayjs(form.fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaExamenProfesional: form.fechaExamenProfesional
        ? dayjs(form.fechaExamenProfesional).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      modalidadTitulacionId: form.modalidadTitulacionId || null,
      cumplioServicioSocial: form.cumplioServicioSocial === ''
        ? null
        : form.cumplioServicioSocial === 1 || form.cumplioServicioSocial === '1',
      fundamentoServicioSocialId: form.fundamentoServicioSocialId || null,
      folioActa: form.folioActa || '',
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
    || !form.fechaInicio
    || !form.fechaTerminacion
    || !form.fechaExamenProfesional
    || !form.modalidadTitulacionId
    || !form.cumplioServicioSocial
    || !form.fundamentoServicioSocialId;

  const isConfirmDisabledEdit = isDisabled || !form.fechaTerminacion;

  return (
    <DefaultModal title={getModalTitle()} open={open} setOpen={setOpen} size={isCreateMode ? 'lg' : 'md'}>
      <Grid container spacing={2}>
        {isCreateMode && (
          <>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de inicio plan de estudios"
                id="fechaInicio"
                name="fechaInicio"
                type="datetime"
                value={form.fechaInicio}
                onChange={handleChange}
                disabled={isDisabled}
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
            <Grid item xs={6}>
              <InputDate
                label="Fecha de examen profesional"
                id="fechaExamenProfesional"
                name="fechaExamenProfesional"
                type="datetime"
                value={form.fechaExamenProfesional}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Modalidad de titulación"
                options={modalidadTitulacionOptions}
                name="modalidadTitulacionId"
                value={form.modalidadTitulacionId}
                onChange={handleSelectChange('modalidadTitulacionId')}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Cumplió servicio social"
                options={cumplioServicioSocialOptions}
                name="cumplioServicioSocial"
                value={form.cumplioServicioSocial}
                onChange={handleSelectChange('cumplioServicioSocial')}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Fundamento legal de servicio social"
                options={fundamentoLegalOptions}
                name="fundamentoServicioSocialId"
                value={form.fundamentoServicioSocialId}
                onChange={handleSelectChange('fundamentoServicioSocialId')}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Número de folio de acta de titulación"
                id="folioActa"
                name="folioActa"
                value={form.folioActa}
                onChange={handleChange}
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
                label="Fecha de inicio plan de estudios"
                id="fechaInicio"
                name="fechaInicio"
                type="datetime"
                value={form.fechaInicio}
                onChange={handleChange}
                disabled={isDisabled}
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
            <Grid item xs={6}>
              <InputDate
                label="Fecha de expedición de título"
                id="fechaExpedicion"
                name="fechaExpedicion"
                type="datetime"
                value={form.fechaExpedicion}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de examen profesional"
                id="fechaExamenProfesional"
                name="fechaExamenProfesional"
                type="datetime"
                value={form.fechaExamenProfesional}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Modalidad de titulación"
                options={modalidadTitulacionOptions}
                name="modalidadTitulacionId"
                value={form.modalidadTitulacionId}
                onChange={handleSelectChange('modalidadTitulacionId')}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Cumplió servicio social"
                options={cumplioServicioSocialOptions}
                name="cumplioServicioSocial"
                value={form.cumplioServicioSocial}
                onChange={handleSelectChange('cumplioServicioSocial')}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Fundamento legal de servicio social"
                options={fundamentoLegalOptions}
                name="fundamentoServicioSocialId"
                value={form.fundamentoServicioSocialId}
                onChange={handleSelectChange('fundamentoServicioSocialId')}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Número de folio de acta de titulación"
                id="folioActa"
                name="folioActa"
                value={form.folioActa}
                onChange={handleChange}
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

ModalTitulo.defaultProps = {
  id: null,
  programaId: null,
  disabled: false,
  alumnosAgregados: [],
  rowData: null,
};

ModalTitulo.propTypes = {
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
    fechaInicio: PropTypes.string,
    fechaTerminacion: PropTypes.string,
    fechaExamenProfesional: PropTypes.string,
    fechaExpedicion: PropTypes.string,
    modalidadTitulacionId: PropTypes.number,
    cumplioServicioSocial: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    fundamentoServicioSocialId: PropTypes.number,
    folioActa: PropTypes.string,
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
