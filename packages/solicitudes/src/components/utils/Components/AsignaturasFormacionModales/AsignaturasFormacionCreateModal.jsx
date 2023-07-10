import React, { useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosAsignaturas from '../../sections/errors/errorDatosAsignaturas';
import handleCreate from '../../submitNewAsignaturas';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import { grados } from '../../Mocks/mockAsignaturas';

export default function AsignaturasFormacionCreateModal({ open, hideModal, title }) {
  const {
    setAsignaturasList,
    formAsignaturasFormacion,
    setFormAsignaturasFormacion,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
    id,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);

  const selectedGrade = grados.semestral;

  const errorsAsignatura = errorDatosAsignaturas(formAsignaturasFormacion, setError, error);

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

    if (value !== initialValue || value === '') {
      errorsAsignatura[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errorsAsignatura !== undefined) {
      setErrors(errorsAsignatura);
    }
  }, [error]);

  const handleOnSubmit = () => {
    handleCreate(
      formAsignaturasFormacion,
      setFormAsignaturasFormacion,
      setInitialValues,
      setAsignaturasList,
      hideModal,
      errors,
      setNoti,
      id,
      2,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <BasicSelect
            title="Grado"
            name="grado"
            options={selectedGrade}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.grado}
            textValue
            required
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
          />
        </Grid>
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
        <Grid item xs={6}>
          <Input
            id="formacionEspecializada"
            label="Formacion especializada"
            name="formacionEspecializada"
            auto="formacionEspecializada"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.formacionEspecializada}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="seriacion"
            label="Seriacion"
            name="seriacion"
            auto="seriacion"
            onchange={handleOnChange}
            onfocus={handleInputFocus}
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
            id="creditos"
            label="Horas independiente"
            name="creditos"
            auto="creditos"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.creditos}
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          >
            Cancelar
          </ButtonStyled>
        </Grid>
        <Grid item>
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
