import { Grid, Checkbox, Typography } from '@mui/material';
import {
  ButtonSimple, DefaultModal, InputDate, DataTable, Select, Input,
  createRecord, getData, useUI,
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

export default function ModalTitulo({
  open,
  setOpen,
  type,
  id,
  programaId,
  setAlumnoResponse,
  disabled,
  alumnosAgregados,
}) {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [form, setForm] = useState({
    fechaInicio: '',
    fechaTerminacion: '',
    fechaExamenProfesional: '',
    modalidadTitulacionId: '',
    cumplioServicioSocial: '',
    fundamentoServicioSocialId: '',
    folioActa: '',
  });
  const { setNoti, setLoading } = useUI();

  const alumnosAgregadosIds = alumnosAgregados.map((a) => a.alumnoId);

  useEffect(() => {
    if (open && type === 'create' && programaId) {
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
    if (!open) {
      setSelectedAlumnos([]);
      setAlumnos([]);
      setForm({
        fechaInicio: '',
        fechaTerminacion: '',
        fechaExamenProfesional: '',
        modalidadTitulacionId: '',
        cumplioServicioSocial: '',
        fundamentoServicioSocialId: '',
        folioActa: '',
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

  const handleConfirm = async () => {
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
          disabled={disabled || alumnos.length === 0}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedAlumnos.includes(params.row.id)}
          onChange={() => handleSelectAlumno(params.row.id)}
          disabled={disabled}
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

  const isConfirmDisabled = disabled
    || selectedAlumnos.length === 0
    || !form.fechaInicio
    || !form.fechaTerminacion
    || !form.fechaExamenProfesional
    || !form.modalidadTitulacionId
    || !form.cumplioServicioSocial
    || !form.fundamentoServicioSocialId;

  return (
    <DefaultModal title="Agregar Alumnos" open={open} setOpen={setOpen} size="lg">
      <Grid container spacing={2}>
        {type === 'create' && (
          <>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de inicio plan de estudios"
                id="fechaInicio"
                name="fechaInicio"
                type="datetime"
                value={form.fechaInicio}
                onChange={handleChange}
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Modalidad de titulación"
                options={modalidadTitulacionOptions}
                name="modalidadTitulacionId"
                value={form.modalidadTitulacionId}
                onChange={handleSelectChange('modalidadTitulacionId')}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Cumplió servicio social"
                options={cumplioServicioSocialOptions}
                name="cumplioServicioSocial"
                value={form.cumplioServicioSocial}
                onChange={handleSelectChange('cumplioServicioSocial')}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Fundamento legal de servicio social"
                options={fundamentoLegalOptions}
                name="fundamentoServicioSocialId"
                value={form.fundamentoServicioSocialId}
                onChange={handleSelectChange('fundamentoServicioSocialId')}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Número de folio de acta de titulación"
                id="folioActa"
                name="folioActa"
                value={form.folioActa}
                onChange={handleChange}
                disabled={disabled}
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
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <ButtonSimple text="Regresar" design="enviar" onClick={handleCancel} />
            </Grid>
            <Grid item>
              <ButtonSimple
                text="Agregar Alumnos"
                design="guardar"
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
              />
            </Grid>
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
};
