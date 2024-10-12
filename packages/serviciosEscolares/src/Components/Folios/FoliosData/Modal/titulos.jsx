import { Grid } from '@mui/material';
import {
  ButtonsSections,
  Context,
  DefaultModal,
  Input,
  InputDate,
  LabelData,
  Select,
  createRecord,
  getData,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const modalidadTitulacion = [
  { id: 1, nombre: 'Por Tesis' },
  { id: 2, nombre: 'Por Promedio' },
  { id: 3, nombre: 'Por Estudios de Posgrados' },
  { id: 4, nombre: 'Por Experiencia Laboral' },
  { id: 5, nombre: 'Por Ceneval' },
  { id: 6, nombre: 'Otro' },
];

const cumplioServicioSocial = [
  { id: 1, nombre: 'Si' },
  { id: 2, nombre: 'No' },
];

const fundamentoLegal = [
  { id: 1, nombre: 'ART. 52 LRART. 5 CONST' },
  { id: 2, nombre: 'ART. 55 LRART. 5 CONST' },
  { id: 3, nombre: 'ART. 91 LRART. 5 CONST' },
  {
    id: 4,
    nombre:
      'ART. 10 REGLAMENTO PARA LA PRESTACIÓN DEL SERVICIO SOCIAL DE LOS ESTUDIANTES DE LAS INSTITUCIONES DE EDUCACIÓN SUPERIOR EN LA REPÚBLICA MEXICANA',
  },
  { id: 5, nombre: 'NO APLICA' },
];

export default function ModalTitulo({
  open,
  setOpen,
  type,
  id,
  setRows,
  rowData,
  programaId,
}) {
  const [position, setPosition] = useState('first');
  const [form, setForm] = useState({});
  const [alumno, setAlumno] = useState(null);
  const [alumnoId, setAlumnoId] = useState(null);
  const { setNoti, setLoading } = useContext(Context);

  useEffect(() => {
    if (type === 'edit' && rowData) {
      setForm({
        ...rowData,
        fechaTermino: dayjs(rowData.fechaTermino).format('YYYY-MM-DD'),
        fechaElaboracion: dayjs(rowData.fechaElaboracion).format('YYYY-MM-DD'),
        fechaInicio: rowData.fechaInicio
          ? dayjs(rowData.fechaInicio).format('YYYY-MM-DD')
          : '',
        fechaTerminacion: rowData.fechaTerminacion
          ? dayjs(rowData.fechaTerminacion).format('YYYY-MM-DD')
          : '',
        fechaExpedicion: rowData.fechaExpedicion
          ? dayjs(rowData.fechaExpedicion).format('YYYY-MM-DD')
          : '',
        fechaExamenProfesional: rowData.fechaExamenProfesional
          ? dayjs(rowData.fechaExamenProfesional).format('YYYY-MM-DD')
          : '',
        fechaExencionExamen: rowData.fechaExencionExamen
          ? dayjs(rowData.fechaExencionExamen).format('YYYY-MM-DD')
          : '',
      });
      setAlumno(rowData.name);
      setAlumnoId(rowData.id);
    }
  }, [type, rowData]);

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

  const handleConfirm = () => {
    setLoading(true);

    const formattedForm = {
      ...form,
      fechaTermino: dayjs(form.fechaTermino).format('YYYY-MM-DDTHH:mm:ssZ'),
      fechaElaboracion: dayjs(form.fechaElaboracion).format(
        'YYYY-MM-DDTHH:mm:ssZ',
      ),
      fechaInicio: form.fechaInicio
        ? dayjs(form.fechaInicio).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaTerminacion: form.fechaTerminacion
        ? dayjs(form.fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaExpedicion: form.fechaExpedicion
        ? dayjs(form.fechaExpedicion).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaExamenProfesional: form.fechaExamenProfesional
        ? dayjs(form.fechaExamenProfesional).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
      fechaExencionExamen: form.fechaExencionExamen
        ? dayjs(form.fechaExencionExamen).format('YYYY-MM-DDTHH:mm:ssZ')
        : null,
    };

    const endpoint = type === 'edit'
      ? `/solicitudesFolios/solicitudesFoliosAlumnos/${form.id}`
      : `/solicitudesFolios/${id}/alumnos/${alumnoId}`;

    const action = type === 'edit' ? updateRecord : createRecord;

    action({ data: formattedForm, endpoint })
      .then((response) => {
        if (response.data) {
          let newRow;

          if (type === 'edit') {
            newRow = {
              id: response.data.id,
              name: alumno,
              fechaTermino: dayjs(response.data.fechaTermino).format(
                'DD/MM/YYYY',
              ),
              fechaElaboracion: dayjs(response.data.fechaElaboracion).format(
                'DD/MM/YYYY',
              ),
            };
          } else {
            newRow = {
              id: response.data.id,
              name: `${response.data.alumno.persona.nombre} ${response.data.alumno.persona.apellidoPaterno} ${response.data.alumno.persona.apellidoMaterno}`,
              fechaTermino: dayjs(response.data.fechaTermino).format(
                'DD/MM/YYYY',
              ),
              fechaElaboracion: dayjs(response.data.fechaElaboracion).format(
                'DD/MM/YYYY',
              ),
            };
          }

          setNoti({
            open: true,
            message:
              type === 'edit'
                ? 'Registro actualizado exitosamente'
                : 'Registro creado exitosamente',
            type: 'success',
          });

          if (type === 'edit') {
            setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? newRow : row)));
          } else {
            setRows((prevRows) => [...prevRows, newRow]);
          }

          setOpen(false);
        }
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `¡Ocurrió un error inesperado!: ${error}`,
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    if (position === 'last') {
      setPosition('first');
    }
  };

  const handleNext = () => {
    if (position === 'first') {
      setPosition('last');
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === 'matricula' && value) {
      setLoading(true);
      getData({
        endpoint: `/alumnos/programas/${programaId}?matricula=${value}`,
      })
        .then((response) => {
          if (response.data) {
            const fullName = `${response.data.persona.nombre} ${response.data.persona.apellidoPaterno} ${response.data.persona.apellidoMaterno}`;
            setAlumno(fullName);
            setAlumnoId(response.data.id);
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

  return (
    <DefaultModal title="Folios título" open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        {position === 'first' && (
          <>
            <Grid item xs={12}>
              <Input
                label="Matrícula"
                id="matricula"
                name="matricula"
                value={form.matricula || ''}
                onblur={handleBlur}
                onchange={handleChange}
              />
            </Grid>
            {alumno && (
              <Grid item xs={12}>
                <LabelData title="Alumno" subtitle={alumno} />
              </Grid>
            )}
            <Grid item xs={6}>
              <Input
                label="Número de folio de acta de titulación"
                id="numeroFolio"
                name="numeroFolio"
                value={form.numeroFolio || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Correo del alumno"
                id="correoAlumno"
                name="correoAlumno"
                value={form.correoAlumno || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de inicio plan de estudios"
                id="fechaInicio"
                name="fechaInicio"
                type="datetime"
                value={form.fechaInicio || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de terminación plan de estudios"
                id="fechaTerminacion"
                name="fechaTerminacion"
                type="datetime"
                value={form.fechaTerminacion || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de expedición de título"
                id="fechaExpedicion"
                name="fechaExpedicion"
                value={form.fechaExpedicion || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Modalidad de titulación"
                options={modalidadTitulacion}
                name="modalidadTitulacion"
                value={form.modalidadTitulacion || ''}
                onchange={handleSelectChange('modalidadTitulacion')}
              />
            </Grid>
          </>
        )}
        {position === 'last' && (
          <>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de examen profesional"
                id="fechaExamenProfesional"
                name="fechaExamenProfesional"
                value={form.fechaExamenProfesional || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de exención de examen"
                id="fechaExencionExamen"
                name="fechaExencionExamen"
                value={form.fechaExencionExamen || ''}
                onchange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Cumplió servicio social"
                options={cumplioServicioSocial}
                name="cumplioServicioSocial"
                value={form.cumplioServicioSocial || ''}
                onchange={handleSelectChange('cumplioServicioSocial')}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Fundamento legal de servicio social"
                options={fundamentoLegal}
                name="fundamentoLegal"
                value={form.fundamentoLegal || ''}
                onchange={handleSelectChange('fundamentoLegal')}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <ButtonsSections
            prev={handlePrev}
            next={handleNext}
            confirm={handleConfirm}
            cancel={handleCancel}
            position={position}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

ModalTitulo.defaultProps = {
  id: null,
  rowData: {},
};

ModalTitulo.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
  programaId: PropTypes.number.isRequired,
  rowData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    fechaTermino: PropTypes.string,
    fechaElaboracion: PropTypes.string,
    fechaInicio: PropTypes.string,
    fechaTerminacion: PropTypes.string,
    fechaExpedicion: PropTypes.string,
    fechaExamenProfesional: PropTypes.string,
    fechaExencionExamen: PropTypes.string,
  }),
};
