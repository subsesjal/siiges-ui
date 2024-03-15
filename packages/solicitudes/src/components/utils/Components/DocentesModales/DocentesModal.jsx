import React, { useContext, useEffect, useState } from 'react';
import {
  Divider, Grid, TextField, Typography,
} from '@mui/material';
import {
  DefaultModal,
  validateField,
  Input,
  Select,
  ButtonSimple,
  InputDate,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import errorDatosDocentes from '../../sections/errors/errorDatosDocentes';
import handleCreate from '../../submitNewDocentes';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import getAsignaturas from '../../getAsignaturas';
import handleEdit from '../../submitEditDocentes';

export default function DocentesModal({
  open,
  hideModal,
  title: propTitle,
  setDocentesList,
  mode,
  rowItem,
}) {
  const {
    formDocentes,
    setFormDocentes,
    setError,
    error,
    setInitialValues,
    programaId,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);
  const asignaturas = getAsignaturas(programaId);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    if (mode !== 'create') {
      setFormDocentes(rowItem);
    }
  }, [mode]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDocentes((prevData) => {
      const newData = { ...prevData };
      const personaFields = ['nombre', 'apellidoPaterno', 'apellidoMaterno'];

      if (name === 'asignaturasDocentes') {
        const newValue = Array.isArray(value) ? value : [value];
        newData.asignaturasDocentes = newValue;
      } else if (name.includes('formacion')) {
        const parts = name.split('_');
        const index = parseInt(parts[1], 10) - 1;
        const fieldName = parts.slice(2).join('_');

        if (!Array.isArray(newData.formacionesDocente)) {
          newData.formacionesDocente = [];
        }

        while (newData.formacionesDocente.length <= index) {
          newData.formacionesDocente.push({});
        }

        const updatedFormacion = {
          ...newData.formacionesDocente[index],
          [fieldName]: value,
        };
        newData.formacionesDocente[index] = updatedFormacion;
      } else if (personaFields.includes(name)) {
        if (!newData.persona) {
          newData.persona = {};
        }
        newData.persona[name] = value;
      } else {
        newData[name] = value;
      }

      return newData;
    });
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    validateField(formDocentes, name, setError, errorDatosDocentes);
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = () => {
    if (mode === 'create') {
      handleCreate(
        formDocentes,
        setFormDocentes,
        setInitialValues,
        setDocentesList,
        hideModal,
        setNoti,
        programaId,
        setCurrentSection,
        1,
      );
    } else if (mode === 'edit') {
      handleEdit(
        formDocentes,
        setFormDocentes,
        setInitialValues,
        setDocentesList,
        hideModal,
        setNoti,
        programaId,
        setCurrentSection,
      );
    }
    hideModal();
    setCurrentSection(1);
  };

  const handleNextSection = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  const handleModalClose = () => {
    hideModal();
    setCurrentSection(1);
  };

  const tiposDocentes = [
    { id: 1, nombre: 'Docente de asignatura' },
    { id: 2, nombre: 'Docente de tiempo completo' },
  ];

  const documentosPresentados = [
    { id: 1, nombre: 'Titulo' },
    { id: 2, nombre: 'Cédula' },
  ];

  const tipoContratacion = [
    { id: 1, nombre: 'Contratación' },
    { id: 2, nombre: 'Tiempo indefinido' },
    { id: 3, nombre: 'Otro' },
  ];

  const nivel = [
    { id: 1, nombre: 'Licenciatura' },
    { id: 2, nombre: 'Técnico Superior Universitario' },
    { id: 3, nombre: 'Especialidad' },
    { id: 4, nombre: 'Maestria' },
    { id: 5, nombre: 'Doctorado' },
    { id: 6, nombre: 'Profesional Asociado' },
  ];

  const isConsultMode = mode === 'consult';

  const getTitleByMode = () => {
    switch (mode) {
      case 'edit':
        return `Editar ${propTitle}`;
      case 'consult':
        return `Consultar ${propTitle}`;
      default:
        return propTitle;
    }
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={getTitleByMode()}>
      {currentSection === 1 && (
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={3}>
            <Select
              title="Tipo de docente"
              name="tipoDocente"
              value=""
              options={tiposDocentes}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoDocente}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombre"
              label="Nombre(s)"
              name="nombre"
              auto="nombre"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.nombre}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="apellidoPaterno"
              label="Apellido paterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.apellidoPaterno}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="apellidoMaterno"
              label="Apellido materno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.apellidoMaterno}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              title="Asignaturas para las que se propone"
              name="asignaturasDocentes"
              multiple
              value={formDocentes.asignaturasDocentes || []}
              options={asignaturas.asignaturas}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.asignaturasDocentes}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              title="Tipo de contratación"
              name="tipoContratacion"
              value=""
              options={tipoContratacion}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoContratacion}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="antiguedad"
              label="Antiguedad"
              name="antiguedad"
              auto="antiguedad"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.antiguedad}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="totalHorasIndependiente"
              label="Total horas independiente"
              name="totalHorasIndependiente"
              auto="totalHorasIndependiente"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.totalHorasIndependiente}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="experienciaLaboral"
              name="experienciaLaboral"
              label="Experiencia laboral"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              onFocus={handleInputFocus}
              required
              error={error.experienciaLaboral}
              disabled={isConsultMode}
            />
          </Grid>
        </Grid>
      )}
      {currentSection === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Formacionés Docentes</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: 3 }}>
            <Typography variant="subtitle">1.</Typography>
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Nivel"
              name="formacion_1_nivelId"
              value=""
              options={nivel}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.formacion_1_nivelId}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={8}>
            <Input
              id="formacion_1_nombre"
              label="Nombre del grado"
              name="formacion_1_nombre"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.formacion_1_nombre}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Select
              title="Documento presentado"
              name="formacion_1_documentoPresentado"
              value=""
              options={documentosPresentados}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.formacion_1_documentoPresentado}
              textValue
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <InputDate
              id="formacion_1_fechaGraduado"
              label="Fecha de Graduado"
              name="formacion_1_fechaGraduado"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.formacion_1_fechaGraduado}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={11}>
            <Input
              id="formacion_1_institucion"
              label="Nombre de la Institución"
              name="formacion_1_institucion"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.formacion_1_institucion}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={1} sx={{ mt: 3 }}>
            <Typography variant="subtitle">2.</Typography>
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Nivel"
              name="formacion_2_nivelId"
              value=""
              options={nivel}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.formacion_2_nivelId}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={8}>
            <Input
              id="formacion_2_nombre"
              label="Nombre del grado"
              name="formacion_2_nombre"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.formacion_2_nombre}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Select
              title="Documento presentado"
              name="formacion_2_documentoPresentado"
              value=""
              options={documentosPresentados}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.formacion_2_documentoPresentado}
              textValue
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <InputDate
              id="formacion_2_fechaGraduado"
              label="Fecha de Graduado"
              name="formacion_2_fechaGraduado"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.formacion_2_fechaGraduado}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={11}>
            <Input
              id="formacion_2_institucion"
              label="Nombre de la Institución"
              name="formacion_2_institucion"
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.formacion_2_institucion}
              disabled={isConsultMode}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <ButtonSimple
            text="Cancelar"
            alt="Cancelar"
            design="cancel"
            onClick={handleModalClose}
          />
        </Grid>
        {currentSection === 1 && (
          <Grid item xs={9}>
            <ButtonSimple
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              onClick={handleNextSection}
              align="right"
            />
          </Grid>
        )}
        {currentSection === 2 && (
          <>
            <Grid item xs={isConsultMode ? 9 : 6.7}>
              <ButtonSimple
                text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                onClick={handlePreviousSection}
                align="right"
              />
            </Grid>
            {!isConsultMode && (
              <Grid item xs={2.3}>
                <ButtonSimple
                  text="Confirmar"
                  alt="Confirmar"
                  onClick={handleOnSubmit}
                  align="right"
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </DefaultModal>
  );
}

DocentesModal.defaultProps = {
  rowItem: null,
};

DocentesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  setDocentesList: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['create', 'edit', 'consult']).isRequired,
  rowItem: PropTypes.objectOf(PropTypes.string),
};
