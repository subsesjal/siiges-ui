import { Grid, Typography, IconButton } from '@mui/material';
import {
  ButtonsForm,
  Context,
  createRecord,
  updateRecord,
  DataTable,
  DefaultModal,
  getData,
  Input,
  LabelData,
  Select,
  InputSearch,
  deleteRecord,
  InputDate,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, {
  useEffect, useState, useContext, useCallback,
} from 'react';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const columns = (setType, setOpen, setAlumnoId, disabled, setOpenDelete) => [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Nombre del alumno', width: 300 },
  { field: 'grade', headerName: 'Grado que cursa', width: 200 },
  { field: 'modalidad', headerName: 'Modalidad', width: 160 },
  { field: 'sector', headerName: 'Sector', width: 140 },
  { field: 'eje', headerName: 'Eje', width: 180 },
  { field: 'dimension', headerName: 'Dimensión', width: 100 },
  { field: 'lugar', headerName: 'Lugar', width: 100 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => (
      !disabled ? (
        <>
          <IconButton
            onClick={() => {
              setType('edit');
              setOpen(true);
              setAlumnoId(params.row.id);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              setAlumnoId(params.row.id);
              setOpenDelete(true);
            }}
          >
            <Delete />
          </IconButton>
        </>
      ) : (
        <IconButton
          onClick={() => {
            setType('consult');
            setOpen(true);
            setAlumnoId(params.row.id);
          }}
        >
          <Visibility />
        </IconButton>
      )
    ),
  },
];

const sectores = [
  { id: 1, nombre: 'Público' },
  { id: 2, nombre: 'Privado' },
];

const modalidades = [
  { id: 1, nombre: '480/900 Horas de trabajo (900 para programas de salud)' },
  { id: 2, nombre: 'Cesantía' },
  { id: 3, nombre: 'Discapacidad / Enfermedad' },
  { id: 4, nombre: 'Año continuo de trabajo' },
  { id: 5, nombre: 'Virtual' },
];

export default function AlumnosServicioSection({ programa, solicitudId, disabled }) {
  const { setLoading, setNoti } = useContext(Context);
  const [alumno, setAlumno] = useState({});
  const [alumnoId, setAlumnoId] = useState(null);
  const [type, setType] = useState('create');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [grados, setGrados] = useState([]);
  const [dimensiones, setDimensiones] = useState([]);
  const [ejes, setEjes] = useState([]);
  const [errors, setErrors] = useState({
    matricula: '',
    gradoId: '',
    modalidadServicioSocialId: '',
    sectorServicioSocialId: '',
    dimensionId: '',
    ejeServicioSocialId: '',
    lugarReceptor: '',
    fechaInicio: '',
    fechaTermino: '',
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await getData({
      endpoint: `/solicitudesServicioSocial/${solicitudId}/solicitudesServicioSocialAlumno`,
    });
    const gradosList = await getData({
      endpoint: '/grados',
    });
    const dimensionesList = await getData({
      endpoint: '/solicitudesServicioSocial/dimensionesServicioSocial',
    });

    const mappedRows = data.data.map((row) => ({
      id: row.id,
      name: `${row.alumno?.persona?.nombre} ${row.alumno?.persona?.apellidoPaterno} ${row.alumno?.persona?.apellidoMaterno}` || '',
      grade: row.grado?.nombre || '',
      tipoSolicitud: row.tipoAlumnoBeca?.descripcion || '',
      porcentajeBeca: `${row.porcentajeBeca || 0} %`,
      promedio: row.promedio || 0,
    }));

    setRows(mappedRows);
    setGrados(gradosList.data);
    setLoading(false);
    setDimensiones(dimensionesList.data);
  }, [solicitudId, setLoading]);

  const fetchEjes = useCallback(async () => {
    setLoading(true);
    const ejesList = await getData({
      endpoint: `/solicitudesServicioSocial/ejesServicioSocial?dimensionServicioSocialId=${form.dimensionId}`,
    });

    setLoading(false);
    setEjes(ejesList.data);
  }, [form.dimensionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (form.dimensionId) {
      fetchEjes();
    }
  }, [form.dimensionId]);

  useEffect(() => {
    if ((type === 'edit' || type === 'consult') && alumnoId) {
      const fetchAlumnoData = async () => {
        const data = await getData({
          endpoint: `/solicitudesServicioSocial/${solicitudId}/solicitudesServicioSocialAlumno/${alumnoId}`,
        });

        setForm({
          matricula: data.data.alumno?.matricula || '',
          alumnoId: data.data.alumnoId || '',
          gradoId: data.data.gradoId || '',
          modalidadServicioSocialId: data.data.modalidadServicioSocialId || '',
          sectorServicioSocialId: data.data.sectorServicioSocialId || '',
          dimensionId: data.data.ejeServicioSocial?.dimensionServicioSocialId || '',
          ejeServicioSocialId: data.data.ejeServicioSocialId || '',
          lugarReceptor: data.data.lugarReceptor || '',
          fechaInicio: data.data.fechaInicio || '',
          fechaTermino: data.data.fechaTermino || '',
        });

        setAlumno({
          id: data.data.alumnoId,
          nombre: `${data.data.alumno?.persona?.nombre} ${data.data.alumno?.persona?.apellidoPaterno} ${data.data.alumno?.persona?.apellidoMaterno}`,
          estatus: data.data.estatusAlumnoBecaId,
          correo: data.data.alumno?.persona?.correoPrimario,
          telefono: data.data.alumno?.persona?.telefono,
        });
      };
      fetchAlumnoData();
    } else {
      setForm({});
      setAlumno({});
    }
  }, [type, alumnoId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSearch = () => {
    if (form.matricula) {
      setLoading(true);
      getData({
        endpoint: `/alumnos/programas/${programa.id}?matricula=${form.matricula}`,
      })
        .then((response) => {
          if (response.data) {
            const fullName = `${response.data.persona.nombre} ${response.data.persona.apellidoPaterno} ${response.data.persona.apellidoMaterno}`;
            setAlumno({
              id: response.data.id,
              nombre: fullName,
              estatus: response.data.situacion.nombre,
              correo: response.data.persona.correoPrimario,
              telefono: response.data.persona.telefono,
            });
            setForm((prevForm) => ({
              ...prevForm,
              alumnoId: response.data.id,
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setNoti({
            open: true,
            message: '¡No se encontró el Alumno!',
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const validateForm = () => {
    const newErrors = {
      matricula: !form.matricula ? 'La matrícula es requerida' : '',
      gradoId: !form.gradoId ? 'El grado es requerido' : '',
      modalidadServicioSocialId: !form.modalidadServicioSocialId ? 'La modalidad es requerida' : '',
      sectorServicioSocialId: !form.sectorServicioSocialId ? 'El sector es requerido' : '',
      dimensionId: !form.dimensionId ? 'La dimension es requerida' : '',
      ejeServicioSocialId: !form.ejeServicioSocialId ? 'El eje es requerido' : '',
      lugarReceptor: !form.lugarReceptor ? 'El Lugar receptor es requerido' : '',
      fechaInicio: !form.fechaInicio ? 'La Fecha de inicio es requerida' : '',
      fechaTermino: !form.fechaTermino ? 'La Fecha de termino es requerida' : '',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  console.log(form);

  const handleSubmit = async () => {
    if (!validateForm() && type !== 'edit') {
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      programaId: programa.id,
    }));

    try {
      let response;
      if (type === 'create') {
        response = await createRecord({
          endpoint: `/solicitudesServicioSocial/${solicitudId}/solicitudesServicioSocialAlumno`,
          data: form,
        });
      } else if (type === 'edit') {
        response = await updateRecord({
          endpoint: `/solicitudesBecas/${solicitudId}/solicitudesBecasAlumnos/${alumnoId}`,
          data: form,
        });
      }

      if (response.statusCode === 200 || response.statusCode === 201) {
        const newRow = {
          id: response.data.id,
          name: alumno.nombre,
          grade: grados.find((grado) => grado.id === form.gradoId)?.nombre || '',
          porcentajeBeca: response.data.porcentajeBeca,
          promedio: response.data.promedio,
        };

        if (type === 'create') {
          setRows((prevRows) => [...prevRows, newRow]);
        } else if (type === 'edit') {
          setRows((prevRows) => prevRows.map((row) => (row.id === alumnoId ? newRow : row)));
        }

        setNoti({
          open: true,
          message: `¡Alumno ${type === 'create' ? 'agregado' : 'actualizado'} correctamente!`,
          type: 'success',
        });
        setOpen(false);
        setForm({});
        setAlumno({});
        setType('create');
        setErrors({
          matricula: '',
          gradoId: '',
          porcentajeBeca: '',
          estatusAlumnoBecaId: '',
          tipoAlumnoBecaId: '',
        });
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || `¡Error al ${type === 'create' ? 'agregar' : 'actualizar'} el alumno!`,
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setNoti({
        open: true,
        message: `¡Error al ${type === 'create' ? 'agregar' : 'actualizar'} el alumno!`,
        type: 'error',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!alumnoId) return;

    try {
      const response = await deleteRecord({
        endpoint: `/solicitudesBecas/solicitudesBecasAlumnos/${alumnoId}`,
      });

      if (response.statusCode === 200 || response.statusCode === 204) {
        setNoti({
          open: true,
          message: '¡Alumno eliminado correctamente!',
          type: 'success',
        });
        setOpenDelete(false);
        fetchData();
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al eliminar el alumno!',
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setNoti({
        open: true,
        message: '¡Error al eliminar el alumno!',
        type: 'error',
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title="Lista de Alumnos asignados a Servicio Social"
          buttonAdd={!disabled}
          buttonText="Agregar Alumno"
          buttonClick={() => {
            setType('create');
            setOpen(true);
            setForm({});
          }}
          rows={rows}
          columns={columns(setType, setOpen, setAlumnoId, disabled, setOpenDelete)}
        />
      </Grid>
      <DefaultModal title="Asignación de Servicio Social" open={open} setOpen={setOpen}>
        <Grid container spacing={2}>
          {type === 'create' && (
            <Grid item xs={12}>
              <InputSearch
                label="Matrícula"
                id="matricula"
                name="matricula"
                value={form.matricula || ''}
                onBlur={handleSearch}
                onClickButton={handleSearch}
                onChange={handleChange}
                required
                errorMessage={errors.matricula}
              />
            </Grid>
          )}
          {(alumno.nombre || (type === 'edit' || type === 'consult')) && (
            <>
              <Grid item xs={9}>
                <LabelData title="Alumno" subtitle={alumno.nombre} />
              </Grid>
              <Grid item xs={3}>
                <LabelData title="Estatus" subtitle={alumno.estatus} />
              </Grid>
              <Grid item xs={4}>
                <LabelData title="Correo" subtitle={alumno.correo} />
              </Grid>
              <Grid item xs={4}>
                <LabelData title="Curp" subtitle={alumno.curp} />
              </Grid>
              <Grid item xs={4}>
                <LabelData title="Teléfono" subtitle={alumno.telefono} />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Grado que cursa"
                  name="gradoId"
                  options={grados}
                  onChange={handleChange}
                  value={form.gradoId || ''}
                  required
                  errorMessage={errors.gradoId}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Modalidad"
                  name="modalidadServicioSocialId"
                  options={modalidades}
                  onChange={handleChange}
                  value={form.modalidadServicioSocialId || ''}
                  required
                  errorMessage={errors.modalidadServicioSocialId}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Sector"
                  name="sectorServicioSocialId"
                  options={sectores}
                  onChange={handleChange}
                  value={form.sectorServicioSocialId || ''}
                  required
                  errorMessage={errors.sectorServicioSocialId}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Dimensión"
                  name="dimensionId"
                  options={dimensiones}
                  onChange={handleChange}
                  value={form.dimensionId || ''}
                  required
                  errorMessage={errors.dimensionId}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Eje"
                  name="ejeServicioSocialId"
                  options={ejes}
                  onChange={handleChange}
                  value={form.ejeServicioSocialId || ''}
                  required
                  errorMessage={errors.ejeServicioSocialId}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  id="lugarReceptor"
                  label="Lugar Receptor"
                  name="lugarReceptor"
                  onChange={handleChange}
                  value={form.lugarReceptor || ''}
                  required
                  errorMessage={errors.lugarReceptor}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDate
                  id="fechaInicio"
                  label="Fecha de Inicio"
                  name="fechaInicio"
                  onChange={handleChange}
                  value={form.fechaInicio || ''}
                  required
                  errorMessage={errors.fechaInicio}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDate
                  id="fechaTermino"
                  label="Fecha Termino"
                  name="fechaTermino"
                  onChange={handleChange}
                  value={form.fechaTermino || ''}
                  required
                  errorMessage={errors.fechaTermino}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonsForm
                  confirm={handleSubmit}
                  confirmDisabled={disabled}
                  cancel={() => setOpen(false)}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DefaultModal>
      <DefaultModal title="Eliminar Alumno" open={openDelete} setOpen={setOpenDelete}>
        <Typography>¿Desea quitar este alumno de esta solicitud?</Typography>
        <ButtonsForm confirm={handleDeleteConfirm} confirmText="Eliminar" cancel={() => { setOpenDelete(false); }} />
      </DefaultModal>
    </Grid>
  );
}

AlumnosServicioSection.propTypes = {
  solicitudId: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  programa: PropTypes.shape({ id: PropTypes.number }).isRequired,
};
