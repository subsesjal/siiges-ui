import React, { useEffect, useContext } from 'react';
import { Grid, TextField } from '@mui/material';
import {
  DefaultModal, ButtonStyled, Context, Select,
} from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import errorDatosInfraestructuras from '../../sections/errors/errorDatosInfraestructuras';
import handleCreate from '../../submitNewInfraestructuras';
import PlantelContext from '../../Context/plantelContext';
import getAsignaturas from '../../getAsignaturas';

export default function InfraestructuraCreateModal({
  open,
  hideModal,
  title,
  programaId,
}) {
  const {
    setInfraestructuras,
    formInfraestructuras,
    setFormInfraestructuras,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
    plantelId,
  } = useContext(PlantelContext);

  const { setNoti } = useContext(Context);
  const { asignaturasTotal } = getAsignaturas(programaId);

  const errorsInfraestructura = errorDatosInfraestructuras(
    formInfraestructuras,
    setError,
    error,
  );

  const instalacion = [
    { id: 1, nombre: 'Aula' },
    { id: 2, nombre: 'Cubiculo' },
    { id: 3, nombre: 'Auditorio' },
    { id: 4, nombre: 'Laboratorio fisico' },
    { id: 5, nombre: 'Laboratorio virtual' },
    { id: 6, nombre: 'Taller fisico' },
    { id: 7, nombre: 'Taller virtual' },
    { id: 8, nombre: 'Laboratorio de computo' },
    { id: 9, nombre: 'Biblioteca fisica' },
    { id: 10, nombre: 'Biblioteca virtual' },
    { id: 11, nombre: 'Otros' },
    { id: 12, nombre: 'Area administrativa' },
    { id: 13, nombre: 'Archivo muerto' },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInfraestructuras((prevData) => {
      const newData = { ...prevData };

      if (name === 'asignaturasInfraestructuras') {
        const newValue = Array.isArray(value) ? value : [value];
        newData.asignaturasInfraestructuras = newValue;
      } else {
        newData[name] = value;
      }

      return newData;
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsInfraestructura[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errorsInfraestructura !== undefined) {
      setErrors(errorsInfraestructura);
    }
  }, [error]);

  const handleOnSubmit = () => {
    handleCreate(
      formInfraestructuras,
      setFormInfraestructuras,
      setInitialValues,
      setInfraestructuras,
      hideModal,
      errors,
      setNoti,
      plantelId,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Instalación"
            name="tipoInstalacionId"
            value=""
            options={instalacion}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.tipoInstalacionId}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nombre}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="capacidad"
            label="Capacidad"
            name="capacidad"
            auto="capacidad"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.capacidad}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="metros"
            label="Metros cuadrados"
            name="metros"
            auto="metros"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.metros}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="ubicacion"
            label="Ubicacion"
            name="ubicacion"
            auto="ubicacion"
            onchange={handleOnChange}
            errorMessage={error.ubicacion}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="recursos"
            name="recursos"
            label="Recursos materiales"
            rows={4}
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.recursos}
            error={!!error.recursos}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            title="Asignatura que atiende"
            name="asignaturasInfraestructuras"
            multiple
            options={asignaturasTotal}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.asignaturasInfraestructuras}
            required
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

InfraestructuraCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
