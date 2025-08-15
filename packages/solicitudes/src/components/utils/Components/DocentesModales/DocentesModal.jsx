import React, { useContext, useEffect, useState } from 'react';
import {
  Divider, Grid, Typography, Button,
} from '@mui/material';
import {
  DefaultModal,
  validateField,
  ButtonSimple,
  Context,
  Select,
  Input,
  InputNumber,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FormacionFields from './FormacionFields';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import {
  documentosPresentados,
  nivel,
  tipoContratacion,
  tiposDocentes,
} from '../../../Sections/Mocks/Docentes/utils';
import handleCreate from '../../submitDocentes';
import useDocentes from '../../getDocente';
import getAsignaturas from '../../getAsignaturas';

const errorDatosDocentes = {
  tipodocente: '¡Nombre inválido!',
  nombre: '¡Nombre inválido!',
  apellidoPaterno: '¡Primer Apellido inválido!',
  apellidoMaterno: '¡Segundo Apellido inválido!',
  tipoDocente: '¡Seleccione un nivel¡',
  asignaturasDocentes: '¡Seleccione una asignatura!',
  tipoContratacion: '¡Seleccione un tipo de contratación!',
  antiguedad: '¡Antigüedad inválida!',
  experiencias: '¡Experiencia laboral inválida!',
  formacion_1_nivelId: '¡Seleccione un Nivel!',
  formacion_1_nombre: '¡Nombre inválido!',
  formacion_1_descripcion: '¡Seleccione un documento!',
  formacion_1_fechaGraduado: '¡Seleccione una fecha!',
  formacion_1_institucion: '¡Institución no inválida!',
  formacion_2_nivelId: '¡Seleccione un Nivel!',
  formacion_2_nombre: '¡Nombre inválido!',
  formacion_2_descripcion: '¡Seleccione un documento!',
  formacion_2_fechaGraduado: '¡Seleccione una fecha!',
  formacion_2_institucion: '¡Institución no inválida!',
};

// Botón personalizado con borde, texto e ícono
const IconButtonCustom = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  borderRadius: 30,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function DocentesModal({
  open,
  hideModal,
  title: propTitle,
  setDocentesList,
  mode,
  id,
}) {
  const { setLoading } = useContext(Context);
  const [showFormacion2, setShowFormacion2] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  const {
    formDocentes,
    setFormDocentes,
    setError,
    error,
    setInitialValues,
    programaId,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);
  const { asignaturasTotal } = getAsignaturas(programaId);

  const docente = useDocentes(id);

  useEffect(() => {
    if (mode !== 'create' && docente) {
      const formaciones = docente.formacionesDocentes?.map((f) => ({
        id: f.id,
        nivelId: f.formacion.nivelId,
        nombre: f.formacion.nombre,
        descripcion: f.formacion.descripcion,
        fechaGraduado: f.formacion.fechaGraduado,
        institucion: f.formacion.institucion,
      })) || [];

      while (formaciones.length < 2) formaciones.push({});

      setFormDocentes({
        id: docente.id,
        programaId: docente.programaId,
        tipoDocente: docente.tipoDocente || '',
        tipoContratacion: docente.tipoContratacion || '',
        antiguedad: docente.antiguedad || '',
        experiencias: docente.experiencias || '',
        asignaturasDocentes:
          docente.asignaturasDocentes?.map((a) => a.asignaturaId) || [],
        persona: {
          nombre: docente.persona?.nombre || '',
          apellidoPaterno: docente.persona?.apellidoPaterno || '',
          apellidoMaterno: docente.persona?.apellidoMaterno || '',
        },
        formacionesDocentes: formaciones,
      });
    }
  }, [docente, mode]);

  useEffect(() => {
    const form2 = formDocentes?.formacionesDocentes?.[1];
    if (
      form2
    && Object.values(form2).some(
      (v) => v !== null && v !== undefined && v !== '',
    )
    ) {
      setShowFormacion2(true);
    } else {
      setShowFormacion2(false);
    }
  }, [formDocentes]);

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
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: validateField({ [name]: value }, name, () => {}, {
        [name]: { message: errorDatosDocentes[name] },
      })[name],
    }));
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAddFormacion2 = () => {
    setShowFormacion2(true);
  };

  const handleRemoveFormacion2 = () => {
    setFormDocentes((prev) => ({
      ...prev,
      formacionesDocentes: prev.formacionesDocentes
        ? prev.formacionesDocentes.slice(0, 1)
        : [],
    }));
    setShowFormacion2(false);
  };

  const handleOnSubmit = () => {
    const requiredFields = [
      {
        name: 'formacion_1_nivelId',
        value: formDocentes?.formacionesDocentes?.[0]?.nivelId,
        errorMsg: errorDatosDocentes.formacion_1_nivelId,
      },
      {
        name: 'formacion_1_nombre',
        value: formDocentes?.formacionesDocentes?.[0]?.nombre,
        errorMsg: errorDatosDocentes.formacion_1_nombre,
      },
      {
        name: 'formacion_1_descripcion',
        value: formDocentes?.formacionesDocentes?.[0]?.descripcion,
        errorMsg: errorDatosDocentes.formacion_1_descripcion,
      },
      {
        name: 'formacion_1_fechaGraduado',
        value: formDocentes?.formacionesDocentes?.[0]?.fechaGraduado,
        errorMsg: errorDatosDocentes.formacion_1_fechaGraduado,
      },
      {
        name: 'formacion_1_institucion',
        value: formDocentes?.formacionesDocentes?.[0]?.institucion,
        errorMsg: errorDatosDocentes.formacion_1_institucion,
      },
    ];

    if (showFormacion2) {
      requiredFields.push(
        {
          name: 'formacion_2_nivelId',
          value: formDocentes?.formacionesDocentes?.[1]?.nivelId,
          errorMsg: errorDatosDocentes.formacion_2_nivelId,
        },
        {
          name: 'formacion_2_nombre',
          value: formDocentes?.formacionesDocentes?.[1]?.nombre,
          errorMsg: errorDatosDocentes.formacion_2_nombre,
        },
        {
          name: 'formacion_2_descripcion',
          value: formDocentes?.formacionesDocentes?.[1]?.descripcion,
          errorMsg: errorDatosDocentes.formacion_2_descripcion,
        },
        {
          name: 'formacion_2_fechaGraduado',
          value: formDocentes?.formacionesDocentes?.[1]?.fechaGraduado,
          errorMsg: errorDatosDocentes.formacion_2_fechaGraduado,
        },
        {
          name: 'formacion_2_institucion',
          value: formDocentes?.formacionesDocentes?.[1]?.institucion,
          errorMsg: errorDatosDocentes.formacion_2_institucion,
        },
      );
    }

    const newErrors = {};
    let isValid = true;

    requiredFields.forEach(({ name, value, errorMsg }) => {
      const err = validateField({ [name]: value }, name, () => {}, {
        [name]: { message: errorMsg },
      })[name];
      if (err) isValid = false;
      newErrors[name] = err;
    });

    setError(newErrors);

    if (isValid) {
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
    }
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

  const hasTwoFormaciones = (mode === 'edit' || mode === 'consult')
    && Array.isArray(formDocentes?.formacionesDocentes)
    && formDocentes.formacionesDocentes.filter(
      (f) => f
        && Object.values(f).some((v) => v !== null && v !== undefined && v !== ''),
    ).length === 2;

  const handleNextSection = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  useEffect(() => {
    if (open) {
      setShowFormacion2(false);
    }
  }, [open]);

  const handleModalClose = () => {
    hideModal();
    setCurrentSection(1);
  };

  return (
    <DefaultModal
      open={open}
      setOpen={hideModal}
      title={getTitleByMode()}
      submitText="Guardar"
      onSubmit={handleOnSubmit}
    >
      {currentSection === 1 && (
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={4}>
            <Select
              title="Tipo de docente"
              name="tipoDocente"
              value={formDocentes?.tipoDocente || ''}
              options={tiposDocentes}
              onChange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoDocente}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={8}>
            <Input
              id="nombre"
              label="Nombre(s)"
              name="nombre"
              auto="nombre"
              value={formDocentes?.persona?.nombre || ''}
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.apellidoMaterno}
              disabled={isConsultMode}
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              title="Asignaturas para las que se propone"
              name="asignaturasDocentes"
              multiple
              value={formDocentes.asignaturasDocentes || []}
              options={asignaturasTotal}
              onChange={handleOnChange}
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
              value={formDocentes?.tipoContratacion || ''}
              options={tipoContratacion}
              onChange={handleOnChange}
              onblur={handleOnBlur}
              errorMessage={error.tipoContratacion}
              required
              disabled={isConsultMode}
            />
          </Grid>
          <Grid item xs={3}>
            <InputNumber
              id="antiguedad"
              label="Antigüedad"
              name="antiguedad"
              auto="antiguedad"
              value={formDocentes?.antiguedad || ''}
              onChange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.antiguedad}
              disabled={isConsultMode}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
          >
            <Typography>Años</Typography>
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
              onChange={handleOnChange}
              onblur={handleOnBlur}
              onfocus={handleInputFocus}
              required
              errorMessage={error.experiencias}
              disabled={isConsultMode}
            />
          </Grid>
        </Grid>
      )}
      {currentSection === 2 && (
        <Grid container spacing={2}>
          {/* Formación 1 */}
          <FormacionFields
            index={1}
            formDocentes={formDocentes}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            handleInputFocus={handleInputFocus}
            error={error}
            isConsultMode={isConsultMode}
            nivel={nivel}
            documentosPresentados={documentosPresentados}
          />

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Botones de agregar/eliminar formación 2 */}
          {!isConsultMode && (
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
            >
              {!showFormacion2 && (
                <IconButtonCustom
                  onClick={handleAddFormacion2}
                  title="Agregar formación"
                >
                  <span>Agregar Formación</span>
                  <AddIcon fontSize="small" />
                </IconButtonCustom>
              )}
              {showFormacion2 && !hasTwoFormaciones && (
                <IconButtonCustom
                  onClick={handleRemoveFormacion2}
                  title="Quitar formación"
                  sx={{ color: 'error.main', borderColor: 'error.main' }}
                >
                  <span>Quitar Formación</span>
                  <DeleteIcon fontSize="small" />
                </IconButtonCustom>
              )}
            </Grid>
          )}

          {/* Formación 2 */}
          {showFormacion2 && (
            <FormacionFields
              index={2}
              formDocentes={formDocentes}
              handleOnChange={handleOnChange}
              handleOnBlur={handleOnBlur}
              handleInputFocus={handleInputFocus}
              error={error}
              isConsultMode={isConsultMode}
              nivel={nivel}
              documentosPresentados={documentosPresentados}
            />
          )}
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
          <Grid
            item
            xs={9}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Página 1-2
            </Typography>
            <Grid item sx={{ marginRight: 2 }}>
              <ButtonSimple
                text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                onClick={handleNextSection}
                align="right"
              />
            </Grid>
          </Grid>
        )}
        {currentSection === 2 && (
          <Grid
            item
            xs={9}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Página 2-2
            </Typography>

            <Grid item sx={{ marginRight: 2 }}>
              <ButtonSimple
                text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                onClick={handlePreviousSection}
                align="right"
              />
            </Grid>
            {!isConsultMode && (
              <Grid item>
                <ButtonSimple
                  text="Guardar"
                  alt="Guardar"
                  onClick={handleOnSubmit}
                  align="right"
                />
              </Grid>
            )}
          </Grid>
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

