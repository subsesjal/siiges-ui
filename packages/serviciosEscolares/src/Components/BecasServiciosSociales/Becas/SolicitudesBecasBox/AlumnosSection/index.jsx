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
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = (setType, setOpen, setAlumnoId) => [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Nombre', width: 300 },
  { field: 'grade', headerName: 'Grado', width: 100 },
  { field: 'estatus', headerName: 'Estatus del alumno', width: 300 },
  { field: 'tipoSolicitud', headerName: 'Tipo de solicitud', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => (
      <>
        <IconButton
          onClick={() => {
            setType('edit');
            setOpen(true);
            setAlumnoId(params.id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const porcentajesOptions = [
  { id: 1, nombre: '25' },
  { id: 2, nombre: '50' },
  { id: 3, nombre: '75' },
  { id: 4, nombre: '100' },
];

const estatusAlumnos = [
  { id: 1, nombre: 'Vigente' },
  { id: 2, nombre: 'Baja Definitiva' },
  { id: 3, nombre: 'Baja Temporal (permiso)' },
  { id: 4, nombre: 'Perdio la beca' },
  { id: 5, nombre: 'Concluyó su beca por tiempo de estudios' },
];

const tiposAlumnos = [
  { id: 1, nombre: 'Nuevo' },
  { id: 2, nombre: 'Refrendo' },
];

export default function AlumnosSection({ programa, solicitudId }) {
  const { setLoading, setNoti } = useContext(Context);
  const [alumno, setAlumno] = useState({});
  const [alumnoId, setAlumnoId] = useState(null);
  const [type, setType] = useState('create');
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [grados, setGrados] = useState([]);
  const [errors, setErrors] = useState({
    matricula: '',
    gradoId: '',
    porcentajeBeca: '',
    estatusAlumnoBecaId: '',
    tipoAlumnoBecaId: '',
    promedio: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData({
        endpoint: `/solicitudesBecas/${solicitudId}/solicitudesBecasAlumnos`,
      });
      const gradosList = await getData({
        endpoint: '/grados',
      });

      const mappedRows = data.data.map((row) => ({
        id: row.id,
        name: `${row.alumno?.persona?.nombre} ${row.alumno?.persona?.apellidoPaterno} ${row.alumno?.persona?.apellidoMaterno}` || '',
        grade: row.grado?.nombre || '',
        estatus: estatusAlumnos.find((estatus) => estatus.id === row.estatusAlumnoBecaId)?.nombre || '',
        tipoSolicitud: row.tipoAlumnoBeca?.descripcion || '',
      }));
      setRows(mappedRows);
      setGrados(gradosList.data);
    };
    fetchData();
  }, [solicitudId]);

  useEffect(() => {
    if (type === 'edit' && alumnoId) {
      const fetchData = async () => {
        const data = await getData({
          endpoint: `/solicitudesBecas/${solicitudId}/solicitudesBecasAlumnos/${alumnoId}`,
        });
        setForm({
          gradoId: data.data.gradoId || '',
          porcentajeBeca: data.data.porcentajeBeca || '',
          estatusAlumnoBecaId: data.data.estatusAlumnoBecaId || '',
          tipoAlumnoBecaId: data.data.tipoAlumnoBecaId || '',
          promedio: data.data.promedio || '',
        });

        setAlumno({
          id: data.data.alumnoId,
          nombre: `${data.data.alumno?.persona?.nombre} ${data.data.alumno?.persona?.apellidoPaterno} ${data.data.alumno?.persona?.apellidoMaterno}`,
          estatus: data.data.estatusAlumnoBecaId,
          correo: data.data.alumno?.persona?.correoPrimario,
          telefono: data.data.alumno?.persona?.telefono,
        });
      };
      fetchData();
    }
  }, [type, alumnoId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === 'matricula' && value) {
      setLoading(true);
      getData({
        endpoint: `/alumnos/programas/${programa.id}?matricula=${value}`,
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
      porcentajeBeca: !form.porcentajeBeca ? 'El porcentaje es requerido' : '',
      estatusAlumnoBecaId: !form.estatusAlumnoBecaId ? 'El estatus es requerido' : '',
      tipoAlumnoBecaId: !form.tipoAlumnoBecaId ? 'El tipo de beca es requerido' : '',
      promedio: !form.promedio ? 'El promedio es requerido' : '',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateForm() && type !== 'edit') {
      return;
    }

    try {
      let response;
      if (type === 'create') {
        response = await createRecord({
          endpoint: `/solicitudesBecas/${solicitudId}/solicitudesBecasAlumnos`,
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
          estatus: estatusAlumnos.find((estatus) => estatus.id === form.estatusAlumnoBecaId)?.nombre || '',
          tipoSolicitud: tiposAlumnos.find((tipo) => tipo.id === form.tipoAlumnoBecaId)?.nombre || '',
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de las Becas Otorgadas</Typography>
      </Grid>
      <Grid item xs={4}>
        <LabelData title="# de Becas Otorgadas 100%" subtitle="50" />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="# de Becas Otorgadas 75%" subtitle="50" />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="# de Becas Otorgadas 50%" subtitle="50" />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="# de Becas Otorgadas 25%" subtitle="50" />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="# de Becas Otorgadas Otros %" subtitle="50" />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonText="Agregar Alumno"
          buttonClick={() => {
            setType('create');
            setOpen(true);
            setForm({});
          }}
          rows={rows}
          columns={columns(setType, setOpen, setAlumnoId)}
        />
      </Grid>
      <DefaultModal title="Asignación de beca" open={open} setOpen={setOpen}>
        <Grid container spacing={2}>
          {type === 'create' && (
            <Grid item xs={12}>
              <Input
                label="Matrícula"
                id="matricula"
                name="matricula"
                value={form.matricula || ''}
                onblur={handleBlur}
                onChange={handleChange}
                required
                errorMessage={errors.matricula}
              />
            </Grid>
          )}
          {(alumno.nombre || type === 'edit') && (
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
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  id="promedio"
                  label="Promedio"
                  name="promedio"
                  onChange={handleChange}
                  value={form.promedio || ''}
                  required
                  errorMessage={errors.promedio}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Porcentaje Otorgado"
                  name="porcentajeBeca"
                  textValue
                  options={porcentajesOptions}
                  onChange={handleChange}
                  value={form.porcentajeBeca || ''}
                  required
                  errorMessage={errors.porcentajeBeca}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Estatus de Beca"
                  name="estatusAlumnoBecaId"
                  options={estatusAlumnos}
                  onChange={handleChange}
                  value={form.estatusAlumnoBecaId || ''}
                  required
                  errorMessage={errors.estatusAlumnoBecaId}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  title="Tipo de Beca de Alumno"
                  name="tipoAlumnoBecaId"
                  options={tiposAlumnos}
                  onChange={handleChange}
                  value={form.tipoAlumnoBecaId || ''}
                  required
                  errorMessage={errors.tipoAlumnoBecaId}
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonsForm confirm={handleSubmit} cancel={() => setOpen(false)} />
              </Grid>
            </>
          )}
        </Grid>
      </DefaultModal>
    </Grid>
  );
}

AlumnosSection.propTypes = {
  solicitudId: PropTypes.number.isRequired,
  programa: PropTypes.shape({ id: PropTypes.number }).isRequired,
};
