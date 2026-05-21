import { Grid, Checkbox, Typography } from '@mui/material';
import {
  ButtonSimple, DefaultModal, InputDate, DataTable, createRecord, getData, useUI,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const SITUACION_EGRESADO = 3;
const TIPO_DOCUMENTO_CERTIFICADO = 2;

export default function ModalCertificado({
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
  const [fechaTerminacion, setFechaTerminacion] = useState('');
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const { setNoti, setLoading } = useUI();

  const alumnosAgregadosIds = alumnosAgregados.map((a) => a.alumnoId);

  useEffect(() => {
    if (open && type === 'create' && programaId) {
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
    if (!open) {
      setSelectedAlumnos([]);
      setFechaTerminacion('');
      setAlumnos([]);
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

  const handleConfirm = async () => {
    if (selectedAlumnos.length === 0) {
      setNoti({
        open: true,
        message: 'Debe seleccionar al menos un alumno',
        type: 'warning',
      });
      return;
    }

    if (!fechaTerminacion) {
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
      fechaTerminacion: dayjs(fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ'),
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

  const isConfirmDisabled = disabled || selectedAlumnos.length === 0 || !fechaTerminacion;

  return (
    <DefaultModal title="Agregar Alumnos" open={open} setOpen={setOpen} size="lg">
      <Grid container spacing={2}>
        {type === 'create' && (
          <>
            <Grid item xs={12}>
              <InputDate
                label="Fecha de terminación plan de estudios"
                id="fechaTerminacion"
                name="fechaTerminacion"
                type="datetime"
                value={fechaTerminacion}
                onChange={(e) => setFechaTerminacion(e.target.value)}
                required
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {`Alumnos egresados disponibles: ${alumnos.length} | Seleccionados: ${selectedAlumnos.length}`}
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

ModalCertificado.defaultProps = {
  id: null,
  programaId: null,
  disabled: false,
  alumnosAgregados: [],
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
};
