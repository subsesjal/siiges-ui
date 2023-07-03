import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosAsignaturas from '../../sections/errors/errorDatosAsignaturas';
import handleEdit from '../../submitEditAsignaturas';
import { AsignaturasContext } from '../../Context/asignaturasContext';

export default function AsignaturasEditModal({
  open, hideModal, rowItem, edit,
}) {
  const {
    area,
    grados,
    initialValues,
    error,
    setError,
    errors,
    form,
    setForm,
    setInitialValues,
    setAsignaturasList,
    id,
    setNoti,
  } = useContext(AsignaturasContext);

  const selectedGrade = grados.semestral;
  const errorsAsignatura = errorDatosAsignaturas(form, setError, error);

  useEffect(() => {
    setForm(rowItem);
    setInitialValues(rowItem);
  }, [rowItem]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
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

  const handleOnSubmit = () => {
    handleEdit(
      form,
      setForm,
      setInitialValues,
      setAsignaturasList,
      hideModal,
      errors,
      setNoti,
      id,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Grado"
            name="grado"
            value={form.grado ?? ''}
            options={selectedGrade}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.grado}
            textValue
            required
          />
        </Grid>
        <Grid item xs={6}>
          <BasicSelect
            title="Area"
            name="area"
            value={form.area ?? ''}
            options={area}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.area}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            value={form.nombre}
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
            value={form.clave}
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
            value={form.creditos}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.creditos}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="formacionEspecializada"
            label="Formacion especializada"
            name="formacionEspecializada"
            auto="formacionEspecializada"
            value={form.formacionEspecializada}
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
            value={form.seriacion}
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
            value={form.horasDocente}
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
            value={form.horasIndependiente}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horasIndependiente}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <ButtonStyled text="Cancelar" alt="Cancelar" design="error" onclick={hideModal}>
          Cancelar
        </ButtonStyled>
        <ButtonStyled text="Confirmar" alt="Confirmar" onclick={handleOnSubmit}>
          Confirmar
        </ButtonStyled>
      </Grid>
    </DefaultModal>
  );
}

AsignaturasEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  edit: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  rowItem: PropTypes.shape({
    // Define the shape of the asignatura object
  }).isRequired,
};
