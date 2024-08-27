import { Grid } from '@mui/material';
import {
  ButtonsSections,
  Context,
  DefaultModal,
  Input,
  InputDate,
  Select,
  createRecord,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function ModalTitulo({
  open, setOpen, type, id, setRows, rowData,
}) {
  const [position, setPosition] = useState('first');
  const [form, setForm] = useState({});
  const [alumno, setAlumno] = useState(null);
  const [alumnoId, setAlumnoId] = useState(null);
  const { setNoti, setLoading } = useContext(Context);

  useEffect(() => {
    if (type === 'edit' && rowData) {
      setForm(rowData);
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
      fechaElaboracion: dayjs(form.fechaElaboracion).format('YYYY-MM-DDTHH:mm:ssZ'),
    };

    const endpoint = type === 'edit'
      ? `/solicitudesFolios/${form.id}`
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
              fechaTermino: dayjs(response.data.fechaTermino).format('DD/MM/YYYY'),
              fechaElaboracion: dayjs(response.data.fechaElaboracion).format('DD/MM/YYYY'),
            };
          } else {
            newRow = {
              id: response.data.id,
              name: `${response.data.alumno.persona.nombre} ${response.data.alumno.persona.apellidoPaterno} ${response.data.alumno.persona.apellidoMaterno}`,
              fechaTermino: dayjs(response.data.fechaTermino).format('DD/MM/YYYY'),
              fechaElaboracion: dayjs(response.data.fechaElaboracion).format('DD/MM/YYYY'),
            };
          }

          setNoti({
            open: true,
            message: type === 'edit' ? 'Registro actualizado exitosamente' : 'Registro creado exitosamente',
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
          message: `Ocurrió un error inesperado: ${error}`,
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
    setPosition((prevPosition) => {
      if (prevPosition === 'last') return 'middle';
      if (prevPosition === 'middle') return 'first';
      return 'first';
    });
  };

  const handleNext = () => {
    setPosition((prevPosition) => {
      if (prevPosition === 'first') return 'middle';
      if (prevPosition === 'middle') return 'last';
      return 'last';
    });
  };

  return (
    <DefaultModal title="Folios título" open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        {position === 'first' && (
          <>
            <Grid item xs={6}>
              <Input
                label="Número de folio de acta de titulación"
                id="numeroFolio"
                name="numeroFolio"
                value={form.numeroFolio || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Clave de institución ante DGP"
                id="claveInstitucion"
                name="claveInstitucion"
                value={form.claveInstitucion || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Clave de carrera ante DGP"
                id="claveCarrera"
                name="claveCarrera"
                value={form.claveCarrera || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                label="Correo del alumno"
                id="correoAlumno"
                name="correoAlumno"
                value={form.correoAlumno || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                label="CURP del alumno"
                id="curpAlumno"
                name="curpAlumno"
                value={form.curpAlumno || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de inicio plan de estudios"
                id="fechaInicio"
                name="fechaInicio"
                type="datetime"
                value={form.fechaInicio || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de terminación plan de estudios"
                id="fechaTerminacion"
                name="fechaTerminacion"
                type="datetime"
                value={form.fechaTerminacion || ''}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}
        {position === 'middle' && (
          <>
            <Grid item xs={6}>
              <Input
                label="Institución de procedencia"
                id="institucionProcedencia"
                name="institucionProcedencia"
                value={form.institucionProcedencia || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Nivel de estudio de antecedente"
                options={[]}
                name="nivelEstudios"
                value={form.nivelEstudios || ''}
                onChange={handleSelectChange('nivelEstudios')}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Estado de antecedente"
                options={[]}
                name="estadoAntecedente"
                value={form.estadoAntecedente || ''}
                onChange={handleSelectChange('estadoAntecedente')}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de inicio de antecedente"
                id="fechaInicioAntecedente"
                name="fechaInicioAntecedente"
                value={form.fechaInicioAntecedente || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de terminación de antecedente"
                id="fechaTerminacionAntecedente"
                name="fechaTerminacionAntecedente"
                value={form.fechaTerminacionAntecedente || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Número de cédula"
                id="numeroCedula"
                name="numeroCedula"
                value={form.numeroCedula || ''}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}
        {position === 'last' && (
          <>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de expedición de título"
                id="fechaExpedicion"
                name="fechaExpedicion"
                value={form.fechaExpedicion || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Modalidad de titulación"
                options={[]}
                name="modalidadTitulacion"
                value={form.modalidadTitulacion || ''}
                onChange={handleSelectChange('modalidadTitulacion')}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDate
                label="Fecha de examen profesional"
                id="fechaExamenProfesional"
                name="fechaExamenProfesional"
                value={form.fechaExamenProfesional || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Cumplió servicio social"
                options={[]}
                name="cumplioServicioSocial"
                value={form.cumplioServicioSocial || ''}
                onChange={handleSelectChange('cumplioServicioSocial')}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Fundamento legal de servicio social"
                options={[]}
                name="fundamentoLegal"
                value={form.fundamentoLegal || ''}
                onChange={handleSelectChange('fundamentoLegal')}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title="Estados"
                options={[]}
                name="estados"
                value={form.estados || ''}
                onChange={handleSelectChange('estados')}
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
  rowData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    fechaTermino: PropTypes.string,
    fechaElaboracion: PropTypes.string,
  }),
};
