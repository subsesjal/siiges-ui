import React, { useContext, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import {
  DefaultModal,
  validateField,
  Input,
  Select,
  ButtonSimple,
  InputDate,
  Context,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import handleCreate from '../../submitDocentes';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import getAsignaturas from '../../getAsignaturas';
import {
  documentosPresentados,
  nivel,
  tipoContratacion,
  tiposDocentes,
} from '../../../Sections/Mocks/Docentes/utils';
import useDocente from '../../getDocente';

const errorDatosDocentes = {
  tipodocente: 'Nombre inválido',
  nombre: 'Nombre inválido',
  apellidoPaterno: 'Primer Apellido inválido',
  apellidoMaterno: 'Segundo Apellido inválido',
  tipoDocente: 'Seleccione un nivel',
  'persona.nombre': 'Nombre inválido',
  'persona.apellidoPaterno': 'Primer Apellido inválido',
  'persona.apellidoMaterno': 'Segundo Apellido inválido',
  asignaturasDocentes: 'Seleccione una asignatura',
  tipoContratacion: 'Seleccione un tipo de contratación',
  antiguedad: 'Antigüedad inválida',
  experiencias: 'Experiencia laboral inválida',
  formacion_1_nivelId: 'Seleccione un Nivel',
  formacion_1_nombre: 'Nombre inválido',
  formacion_1_descripcion: 'Seleccione un documento',
  formacion_1_fechaGraduado: 'Seleccione una fecha',
  formacion_1_institucion: 'Institución no inválida',
  formacion_2_nivelId: 'Seleccione un Nivel',
  formacion_2_nombre: 'Nombre inválido',
  formacion_2_descripcion: 'Seleccione un documento',
  formacion_2_fechaGraduado: 'Seleccione una fecha',
  formacion_2_institucion: 'Institución no inválida',
};

export default function DocentesModal({
  open,
  hideModal,
  title: propTitle,
  setDocentesList,
  mode,
  id,
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
  const { setLoading } = useContext(Context);
  const { asignaturasTotal } = getAsignaturas(programaId);
  const [currentSection, setCurrentSection] = useState(1);
  const docente = useDocente(id);

  useEffect(() => {
    if (mode !== 'create' && docente) {
      const docenteValues = {
        id: docente.id,
        programaId: docente.programaId,
        tipoDocente: docente.tipoDocente,
        tipoContratacion: docente.tipoContratacion,
        antiguedad: docente.antiguedad,
        experiencias: docente.experiencias,
        asignaturasDocentes:
          docente.asignaturasDocentes?.map((asig) => asig.asignaturaId) || [],
        persona: {
          nombre: docente.persona?.nombre,
          apellidoPaterno: docente.persona?.apellidoPaterno,
          apellidoMaterno: docente.persona?.apellidoMaterno,
        },
        formacionesDocentes: docente.formacionesDocentes?.map((formacion) => ({
          id: formacion.id,
          nivelId: formacion.formacion.nivelId,
          nombre: formacion.formacion.nombre,
          descripcion: formacion.formacion.descripcion,
          fechaGraduado: formacion.formacion.fechaGraduado,
          institucion: formacion.formacion.institucion,
        })) || [{}, {}],
      };
      setFormDocentes(docenteValues);
    }
  }, [docente]);

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

        if (!Array.isArray(newData.formacionesDocentes)) {
          newData.formacionesDocentes = [];
        }

        while (newData.formacionesDocentes.length <= index) {
          newData.formacionesDocentes.push({});
        }

        const updatedFormacion = {
          ...newData.formacionesDocentes[index],
          [fieldName]: value,
        };
        newData.formacionesDocentes[index] = updatedFormacion;
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
    handleCreate(
      formDocentes,
      setFormDocentes,
      setInitialValues,
      setDocentesList,
      hideModal,
      setNoti,
      programaId,
      setCurrentSection,
      mode,
      setLoading,
    );
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

  const isConsultMode = mode === 'consult';

  const getTitleByMode = () => {
    switch (mode) {
      case 'edit':
        return 'Editar Docente';
      case 'consult':
        return 'Consultar Docente';
      default:
        return propTitle;
    }
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={getTitleByMode()}>
      {currentSection === 1 && (
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={6}>
            <Select
              title="Tipo de docente"
              name="tipoDocente"
              value={formDocentes?.tipoDocente || ''}
              options={tiposDocentes}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoDocente}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="nombre"
              label="Nombre(s)"
              name="nombre"
              auto="nombre"
              value={formDocentes?.persona?.nombre || ''}
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
              label="Primer Apellido"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              value={formDocentes?.persona?.apellidoPaterno || ''}
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
              label="Segundo Apellido"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              value={formDocentes?.persona?.apellidoMaterno || ''}
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
              options={asignaturasTotal}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.asignaturasDocentes}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Tipo de contratación"
              name="tipoContratacion"
              value={formDocentes?.tipoContratacion || ''}
              options={tipoContratacion}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoContratacion}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              id="antiguedad"
              label="Antigüedad"
              name="antiguedad"
              auto="antiguedad"
              value={formDocentes?.antiguedad || ''}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.antiguedad}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="experiencias"
              name="experiencias"
              label="Experiencia laboral"
              value={formDocentes?.experiencias || ''}
              rows={4}
              multiline
              sx={{ width: '100%' }}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              error={error.experiencias}
              disabled={isConsultMode}
            />
          </Grid>
        </Grid>
      )}
      {currentSection === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Formaciones Docentes</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: 3 }}>
            <Typography variant="subtitle">1.</Typography>
          </Grid>
          <Grid item xs={3}>
            <Select
              title="Nivel"
              name="formacion_1_nivelId"
              value={formDocentes?.formacionesDocentes[0]?.nivelId || ''}
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
              value={formDocentes?.formacionesDocentes[0]?.nombre || ''}
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
              name="formacion_1_descripcion"
              value={formDocentes?.formacionesDocentes[0]?.descripcion || ''}
              options={documentosPresentados}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.formacion_1_descripcion}
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
              value={formDocentes?.formacionesDocentes[0]?.fechaGraduado || ''}
              onchange={handleOnChange}
              onfocus={handleInputFocus}
              required
              type="datetime"
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
              value={formDocentes?.formacionesDocentes[0]?.institucion || ''}
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
              value={formDocentes?.formacionesDocentes[1]?.nivelId || ''}
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
              value={formDocentes?.formacionesDocentes[1]?.nombre || ''}
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
              name="formacion_2_descripcion"
              value={formDocentes?.formacionesDocentes[1]?.descripcion || ''}
              options={documentosPresentados}
              onchange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.formacion_2_descripcion}
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
              value={formDocentes?.formacionesDocentes[1]?.fechaGraduado || ''}
              onchange={handleOnChange}
              onfocus={handleInputFocus}
              required
              type="datetime"
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
              value={formDocentes?.formacionesDocentes[1]?.institucion || ''}
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
                  text="Guardar"
                  alt="Guardar"
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
  id: null,
};

DocentesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  setDocentesList: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['create', 'edit', 'consult']).isRequired,
};
