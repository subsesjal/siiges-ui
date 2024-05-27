import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled, Context } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import handleCreate from '../../submitNewAsignaturas';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import { grados } from '../../Mocks/mockAsignaturas';
import errorDatosAsignaturasFormacion from '../../sections/errors/errorDatosAsignaturasFormacion';
import SolicitudContext from '../../Context/solicitudContext';

export default function AsignaturasFormacionCreateModal({
  open,
  hideModal,
  title,
}) {
  const {
    setAsignaturasFormacionList,
    setAsignaturasTotalList,
    formAsignaturasFormacion,
    setFormAsignaturasFormacion,
    asignaturasTotalList,
    setError,
    error,
    setErrors,
    initialValues,
    setInitialValues,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);
  const { setLoading } = useContext(Context);
  const { form } = useContext(SolicitudContext);
  const [selectedGrade, setSelectedGrade] = useState(grados.semestral);

  useEffect(() => {
    if (form) {
      switch (form[1].programa.cicloId) {
        case 1:
          setSelectedGrade(grados.semestral);
          break;
        case 2:
          setSelectedGrade(grados.cuatrimestral);
          break;
        case 3:
          setSelectedGrade(grados.flexibleSemestral);
          break;
        case 4:
          setSelectedGrade(grados.flexibleCuatrimestral);
          break;
        case 5:
          setSelectedGrade(grados.optativa);
          break;
        default:
          setSelectedGrade(grados.semestral);
          break;
      }
    }
  }, [form]);

  const errorsAsignatura = errorDatosAsignaturasFormacion(
    formAsignaturasFormacion,
    setError,
    error,
  );

  useEffect(() => {
    if (errorsAsignatura !== undefined) {
      setErrors(errorsAsignatura);
    }
  }, [error]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAsignaturasFormacion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (
      errorsAsignatura[name]
      && typeof errorsAsignatura[name] === 'function'
    ) {
      if (value !== initialValue || value === '') {
        errorsAsignatura[name]();
      }
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = () => {
    const matchingGrade = selectedGrade.find(
      (grade) => grade.id === formAsignaturasFormacion.gradoId,
    );
    const updatedFormAsignaturas = matchingGrade
      ? { ...formAsignaturasFormacion, grado: matchingGrade.nombre }
      : { ...formAsignaturasFormacion };

    handleCreate(
      updatedFormAsignaturas,
      setFormAsignaturasFormacion,
      setInitialValues,
      setAsignaturasFormacionList,
      hideModal,
      setNoti,
      2,
      setLoading,
      setAsignaturasTotalList,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Grado"
            name="gradoId"
            value=""
            options={selectedGrade}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.gradoId}
            required
          />
        </Grid>
        <Grid item xs={6}>
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
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="clave"
            label="Clave"
            name="clave"
            auto="clave"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.clave}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="creditos"
            label="Creditos"
            name="creditos"
            auto="creditos"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.creditos}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="academia"
            label="Academia"
            name="academia"
            auto="academia"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.academia}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            title="Seriacion"
            name="seriacion"
            value=""
            options={asignaturasTotalList || []}
            onchange={handleOnChange}
            textValue
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasDocente"
            label="Horas docente"
            name="horasDocente"
            auto="horasDocente"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horasDocente}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasIndependiente"
            label="Horas independiente"
            name="horasIndependiente"
            auto="horasIndependiente"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horasIndependiente}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          >
            Cancelar
          </ButtonStyled>
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={handleOnSubmit}
          >
            Confirmar
          </ButtonStyled>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

AsignaturasFormacionCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
