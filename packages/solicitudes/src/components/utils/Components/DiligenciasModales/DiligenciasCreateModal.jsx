import React, { useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled, Context } from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosDiligencias from '../../sections/errors/errorDatosDiligencias';
import handleCreate from '../../submitNewDiligencias';
import DatosGeneralesContext from '../../Context/datosGeneralesContext';

export default function DiligenciasCreateModal({
  open, hideModal, title, id,
}) {
  const {
    setDiligencias,
    formDiligencias,
    setFormDiligencias,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
  } = useContext(DatosGeneralesContext);
  const { setNoti } = useContext(Context);

  const errorsDiligencias = errorDatosDiligencias(
    formDiligencias,
    setError,
    error,
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDiligencias((prevData) => {
      if (
        name === 'nombre'
        || name === 'apellidoPaterno'
        || name === 'apellidoMaterno'
        || name === 'tituloCargo'
        || name === 'correo_primario'
        || name === 'telefono'
        || name === 'celular'
      ) {
        return {
          ...prevData,
          persona: {
            ...prevData.persona,
            [name]: value,
          },
        };
      } if (name === 'horaInicio' || name === 'horaFin') {
        const timeArray = value.split(':');
        const date = new Date();
        date.setHours(parseInt(timeArray[0], 10));
        date.setMinutes(parseInt(timeArray[1], 10));

        return {
          ...prevData,
          [name]: date,
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsDiligencias[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errorsDiligencias !== undefined) {
      setErrors(errorsDiligencias);
    }
    if (id) {
      setFormDiligencias({ ...formDiligencias, solicitudId: id });
    }
  }, [error, id]);

  const handleOnSubmit = () => {
    handleCreate(
      formDiligencias,
      setFormDiligencias,
      setInitialValues,
      setDiligencias,
      hideModal,
      errors,
      setNoti,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
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
            id="apellidoPaterno"
            label="Apellido Paterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoMaterno"
            label="Apellido Materno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.apellidoMaterno}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="tituloCargo"
            label="Cargo"
            name="tituloCargo"
            auto="tituloCargo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.tituloCargo}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correo_primario"
            label="Correo"
            name="correo_primario"
            auto="correo_primario"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.correo_primario}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="telefono"
            label="Telefono"
            name="telefono"
            auto="telefono"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.telefono}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="celular"
            label="Celular"
            name="celular"
            auto="celular"
            onchange={handleOnChange}
            onfocus={handleInputFocus}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="horaInicio"
            label="Hora Inicio"
            name="horaInicio"
            auto="horaInicio"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horaInicio}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="horaFin"
            label="Hora Fin"
            name="horaFin"
            auto="horaFin"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horaFin}
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

DiligenciasCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
